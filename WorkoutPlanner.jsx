import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Card, Row, Col, ListGroup } from "react-bootstrap";
import { FaDumbbell } from "react-icons/fa"; // Importing a fitness icon

function WorkoutPlanner() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // User state
    const [userId, setUserId] = useState("");
    const [workouts, setWorkouts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newWorkout, setNewWorkout] = useState({ name: "", status: "In Progress" });
    const [editWorkout, setEditWorkout] = useState(null);
    const [showAddWorkoutModal, setShowAddWorkoutModal] = useState(false);
    const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
    const [newExercise, setNewExercise] = useState({ name: "", sets: 0, reps: 0, time: "" });
    const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
    const [viewExercisesModal, setViewExercisesModal] = useState(false); // New state for view exercises modal
    const [selectedWorkoutExercises, setSelectedWorkoutExercises] = useState([]); // State to hold the exercises for the selected workout

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
                fetchWorkouts(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            setShowModal(true);
        }
    }, [token]);

    // Fetch Workouts
    const fetchWorkouts = async (userId) => {
        try {
            const response = await axios.get(`https://localhost:7182/api/Workouts/GetWorkouts/${userId}`);
            setWorkouts(response.data);
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    };

    // Handle Workout Submission
    const handleCreateWorkout = async () => {
        try {
            const response = await axios.post("https://localhost:7182/api/Workouts/CreateWorkout", {
                ...newWorkout,
                userId
            });
            setWorkouts([...workouts, response.data]);
            setShowAddWorkoutModal(false);
            setNewWorkout({ name: "", status: "In Progress" });
        } catch (error) {
            console.error("Error creating workout:", error);
        }
    };

    // Update Workout
    const handleUpdateWorkout = async () => {
        try {
            const response = await axios.put(`https://localhost:7182/api/Workouts/UpdateWorkout/${editWorkout.id}`, editWorkout);
            setWorkouts(workouts.map(w => (w.id === editWorkout.id ? response.data : w)));
            setEditWorkout(null);
        } catch (error) {
            console.error("Error updating workout:", error);
        }
    };

    // Add Exercise
    const handleAddExercise = async () => {
        try {
            const response = await axios.post(`https://localhost:7182/api/Workouts/AddExercise/${selectedWorkoutId}`, newExercise);
            const updatedWorkouts = workouts.map(workout => {
                if (workout.id === selectedWorkoutId) {
                    workout.exercises.push(response.data.exercise);
                }
                return workout;
            });
            setWorkouts(updatedWorkouts);
            setShowAddExerciseModal(false);
            setNewExercise({ name: "", sets: 0, reps: 0, time: "" });
        } catch (error) {
            console.error("Error adding exercise:", error);
        }
    };

    // Delete Workout
    const handleDeleteWorkout = async (id) => {
        try {
            await axios.delete(`https://localhost:7182/api/Workouts/DeleteWorkout/${id}`);
            setWorkouts(workouts.filter((w) => w.id !== id));
        } catch (error) {
            console.error("Error deleting workout:", error);
        }
    };

    // Open view exercises modal
    const handleViewExercises = (workout) => {
        setSelectedWorkoutExercises(workout.exercises); // Set the exercises for the selected workout
        setViewExercisesModal(true); // Show the modal
    };

    return (
        <>
            {/* Modal for not signed in */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>You need to sign in to access the workout planner.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate("/")}>Close</Button>
                    <Button variant="primary" onClick={() => navigate("/login")}>Go to Sign In</Button>
                </Modal.Footer>
            </Modal>

            {token && (
                <div className="p-4" style={{ position: "relative", height: "100vh" }}>
                    {/* Blurry background */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundImage: "url(https://img.freepik.com/premium-photo/workout-plan-with-fitness-food-equipment-gray-background-top-view_157927-6231.jpg)",
                            backgroundSize: "contain",
                            filter: "blur(2px)",
                            zIndex: -1,
                        }}
                    ></div>

                    {/* Content */}
                    <div className="content" style={{ position: "relative", zIndex: 1 }}>
                        <div><Button variant="light" className="mb-4" onClick={() => navigate("/")}>Back</Button></div>
                        <div className="mb-3">
                        <Button className="me-2" variant="primary" onClick={() => setShowAddWorkoutModal(true)}>
                            Add Workout
                        </Button>
                        <Button variant="info"  onClick={() => navigate("/calendar")}>Calendar</Button>
                        </div>

                        {/* Add Workout Modal */}
                        <Modal show={showAddWorkoutModal} onHide={() => setShowAddWorkoutModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add New Workout</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Workout Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newWorkout.name}
                                            onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                                            placeholder="Enter workout name"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="mt-2" onClick={handleCreateWorkout}>Add Workout</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/* Add Exercise Modal */}
                        <Modal show={showAddExerciseModal} onHide={() => setShowAddExerciseModal(false)}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Exercise</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Exercise Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newExercise.name}
                                            onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                                            placeholder="Enter exercise name"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Sets</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={newExercise.sets}
                                            onChange={(e) => setNewExercise({ ...newExercise, sets: e.target.value })}
                                            placeholder="Enter sets"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Reps</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={newExercise.reps}
                                            onChange={(e) => setNewExercise({ ...newExercise, reps: e.target.value })}
                                            placeholder="Enter reps"
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Time</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={newExercise.time}
                                            onChange={(e) => setNewExercise({ ...newExercise, time: e.target.value })}
                                            placeholder="Enter time"
                                        />
                                    </Form.Group>
                                    <Button variant="primary" className="mt-2" onClick={handleAddExercise}>Add Exercise</Button>
                                </Form>
                            </Modal.Body>
                        </Modal>

                        {/* View Exercises Full Screen Modal */}
                        <Modal show={viewExercisesModal} onHide={() => setViewExercisesModal(false)} size="lg" fullscreen>
                            <Modal.Header closeButton style={{ background: "linear-gradient(135deg,rgb(140, 142, 151), #1e3d58)", color: "white" }}>
                                <Modal.Title>
                                    <FaDumbbell className="me-2" />
                                    Exercises
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ backgroundColor: "#f8f9fc", padding: "20px", borderRadius: "10px" }}>
                                <Row>
                                    {selectedWorkoutExercises.map((exercise) => (
                                        <Col md={6} lg={4} key={exercise.id} className="mb-4">
                                            <Card className="shadow-sm" style={{ borderRadius: "10px" }}>
                                                <Card.Body>
                                                    <Card.Title style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                                                        {exercise.name}
                                                    </Card.Title>
                                                    <ListGroup variant="flush">
                                                        <ListGroup.Item>
                                                            <strong>Sets:</strong> {exercise.sets}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <strong>Reps:</strong> {exercise.reps}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <strong>Time:</strong> {exercise.time}
                                                        </ListGroup.Item>
                                                    </ListGroup>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Modal.Body>
                            <Modal.Footer style={{ borderTop: "none", backgroundColor: "#f8f9fc" }}>
                                <Button variant="secondary" onClick={() => setViewExercisesModal(false)}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        {/* Edit Workout Modal */}
                        {editWorkout && (
                            <Modal show={true} onHide={() => setEditWorkout(null)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Workout</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Workout Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                value={editWorkout.name}
                                                onChange={(e) => setEditWorkout({ ...editWorkout, name: e.target.value })}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Workout Status</Form.Label>
                                            <Form.Select
                                                value={editWorkout.status}
                                                onChange={(e) => setEditWorkout({ ...editWorkout, status: e.target.value })}
                                            >
                                                <option>In Progress</option>
                                                <option>Completed</option>
                                                <option>Incomplete</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Button variant="primary" className="mt-2" onClick={handleUpdateWorkout}>Save Changes</Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        )}

                        {/* Workouts Block Layout with Transparency */}
                        <Row>
                            {workouts.map((workout) => (
                                <Col md={4} key={workout.id} className="mb-3">
                                    <Card style={{ opacity: 0.9, backgroundColor: "rgb(255, 255, 255)", borderRadius: "10px" }}>
                                        <Card.Body>
                                            <Card.Title>{workout.name}</Card.Title>
                                            <div style={{ backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '5px', marginBottom: '10px' }}>
                                                {workout.status}
                                            </div>

                                            {/* Display Exercises */}
                                            <div>
                                                <Button className="mt-2 mb-2 me-2" variant="secondary" onClick={() => handleViewExercises(workout)}>View Exercises</Button>
                                                <Button variant="success" onClick={() => { setSelectedWorkoutId(workout.id); setShowAddExerciseModal(true); }}>Add Exercise</Button>
                                            </div>

                                            <div className="mt-2">
                                                <Button variant="warning" className="me-2" onClick={() => setEditWorkout(workout)}>Edit</Button>
                                                <Button variant="danger" onClick={() => handleDeleteWorkout(workout.id)}>Delete</Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            )}
        </>
    );
}

export default WorkoutPlanner;
