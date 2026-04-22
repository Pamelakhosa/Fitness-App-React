import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Modal, Button, Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const PlannerCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", date: new Date() });
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);

    const API_URL = "https://localhost:7182/api/Planners";

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const decodedToken = jwtDecode(token);
            const currentUserId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            setUserId(currentUserId);

            axios.get(`${API_URL}/GetPlannersByUserId/${currentUserId}`)
                .then(response => setEvents(response.data))
                .catch(error => {
                    console.error("Error fetching planners:", error);
                    setEvents([]); // Ensure calendar still works even if API fails
                });
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }, []);

    const openAddPlanModal = () => {
        setFormData({ title: "", description: "", date: new Date() });
        setEditMode(false);
        setShowModal(true);
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setFormData({ title: event.title, description: event.description, date: event.date });
        setEditMode(true);
        setShowModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEvent = () => {
        if (!userId) {
            alert("User not authenticated!");
            return;
        }
        const newEvent = { userId, title: formData.title, description: formData.description, date: formData.date };
        axios.post(`${API_URL}/PostPlanner`, newEvent)
            .then(response => {
                setEvents([...events, response.data]);
                setShowModal(false);
            })
            .catch(error => console.error("Error adding planner:", error.response?.data || error.message));
    };

    const handleUpdateEvent = () => {
        if (!selectedEvent) return;

        const updatedEvent = { ...selectedEvent, ...formData };
        axios.put(`${API_URL}/PutPlanner/${selectedEvent.id}`, updatedEvent)
            .then(() => {
                setEvents(events.map(e => (e.id === selectedEvent.id ? updatedEvent : e)));
                setShowModal(false);
            })
            .catch(error => console.error("Error updating planner:", error));
    };

    const handleDeleteEvent = () => {
        if (!selectedEvent) return;
        axios.delete(`${API_URL}/DeletePlanner/${selectedEvent.id}`)
            .then(() => {
                setEvents(events.filter(e => e.id !== selectedEvent.id));
                setShowModal(false);
            })
            .catch(error => console.error("Error deleting planner:", error));
    };

    return (
        <div className="planner-background">
            <div className="planner-container">
                <Button variant="light" className="back-button" onClick={() => navigate("/workoutplanner")}>
                    Back
                </Button>

                {/* Add Plan Button */}
                <div className="text-center mb-3">
                    <Button variant="primary" onClick={openAddPlanModal}>Add Plan</Button>
                </div>

                {/* Flex container to hold Calendar and Upcoming Events */}
                <Row>
                    <Col md={8}>
                        {/* Calendar */}
                        <div className="calendar-wrapper">
                            <Calendar
                                value={date}
                                tileContent={({ date }) => {
                                    const event = events.find(e => new Date(e.date).toDateString() === date.toDateString());
                                    return event ? (
                                        <div className="calendar-event" onClick={() => handleEventClick(event)}>
                                            {event.title}
                                        </div>
                                    ) : null;
                                }}
                            />
                        </div>
                    </Col>

                    <Col md={4}>
                        {/* Upcoming Events Card */}
                        <Card>
                            <Card.Body>
                                <Card.Title>Upcoming Plans</Card.Title>
                                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                    {events.slice(0, 5).map((event, index) => (
                                        <li key={index} style={{ marginBottom: "10px" }}>
                                            <strong>{event.title}</strong>
                                            <p>{new Date(event.date).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Modal for Adding/Editing Events */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Plan" : "Add Plan"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={formData.date.toString().split("T")[0]}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {editMode ? (
                            <>
                                <Button variant="danger" onClick={handleDeleteEvent}>Delete</Button>
                                <Button variant="primary" onClick={handleUpdateEvent}>Update</Button>
                            </>
                        ) : (
                            <Button variant="success" onClick={handleAddEvent}>Add Plan</Button>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default PlannerCalendar;
