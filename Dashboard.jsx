import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register Chart.js components, including ArcElement for Pie chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement, // Register ArcElement for Pie chart
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Define state for userName, userId, modal visibility, and chart data
    const [userName, setUserName] = useState("");
    const [userId, setUserId] = useState("");
    const [showModal, setShowModal] = useState(false); // Modal state
    const [totalWorkouts, setTotalWorkouts] = useState([]);
    const [avgExercisesPerWeek, setAvgExercisesPerWeek] = useState([]);
    const [workoutProgress, setWorkoutProgress] = useState({ completed: 0, remaining: 0 });

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const extractedUserName =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
                const extractedUserId =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                setUserName(extractedUserName);
                setUserId(extractedUserId);

                // Fetch workout data (this should be an API call)
                fetchWorkoutData(extractedUserId);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            setShowModal(true); // Show the modal if no token is found
        }
    }, [token]); // Runs when token changes

    // Function to handle sign-in redirect
    function handleSignInRedirect() {
        navigate("/login");
    }

    // Function to simulate fetching workout data
    function fetchWorkoutData(userId) {
        // Mocking data for now. Replace with API calls.
        setTotalWorkouts([5, 10, 15, 20, 25, 30, 35, 40, 45, 50]);
        setAvgExercisesPerWeek([3, 5, 7, 6, 8, 9, 10, 6, 7, 8]);

        // Mocking progress for the pie chart (you would replace this with your actual data)
        setWorkoutProgress({ completed: 75, remaining: 25 });
    }

    return (
        <>
            {/* Modal for not signed in */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to sign in to access the dashboard.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate("/")}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSignInRedirect}>
                        Go to Sign In
                    </Button>
                </Modal.Footer>
            </Modal>

            {token && (
                <div
                    style={{
                        position: "relative",
                        minHeight: "100vh",
                    }}
                >
                    {/* Background image div with blur */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: 'url(https://t3.ftcdn.net/jpg/04/29/35/62/360_F_429356296_CVQ5LkC6Pl55kUNLqLisVKgTw9vjyif1.jpg)', // Add your background image URL here
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            filter: "blur(1px)", // Apply blur to the background
                            zIndex: -1, // Ensure this stays in the background
                        }}
                    ></div>

                    <div className="p-4">
                        <legend className="mb-2 mt-2 text-white">
                            Welcome, {userName ? `${userName} ` : ""}
                        </legend>
                        <Button variant="light" className="mt-5" onClick={() => navigate("/")}>Back</Button>

                        {/* Dashboard Content */}
                        <Row className="mt-4">
                            <Col md={6}>
                                <Card
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent background for card
                                        borderRadius: "10px", // Optional: rounded corners
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for depth
                                        position: "relative",
                                        zIndex: 1, // Ensure card is above background
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>Total Workouts</Card.Title>
                                        <Line
                                            data={{
                                                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                                                datasets: [
                                                    {
                                                        label: "Total Workouts",
                                                        data: totalWorkouts,
                                                        borderColor: "rgb(75, 192, 192)",
                                                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                                                        fill: true,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Total Workouts Over Time",
                                                    },
                                                },
                                            }}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={6}>
                                <Card
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent background for card
                                        borderRadius: "10px", // Optional: rounded corners
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for depth
                                        position: "relative",
                                        zIndex: 1, // Ensure card is above background
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>Avg. Exercises Per Week</Card.Title>
                                        <Bar
                                            data={{
                                                labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8", "Week 9", "Week 10"],
                                                datasets: [
                                                    {
                                                        label: "Average Exercises",
                                                        data: avgExercisesPerWeek,
                                                        backgroundColor: "rgba(54, 162, 235, 0.2)",
                                                        borderColor: "rgba(54, 162, 235, 1)",
                                                        borderWidth: 1,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Average Exercises Per Week",
                                                    },
                                                },
                                            }}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {/* Pie chart should span the full width */}
                        <Row className="mt-4">
                            <Col md={12}>
                                <Card
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent background for card
                                        borderRadius: "10px", // Optional: rounded corners
                                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional: shadow for depth
                                        position: "relative",
                                        zIndex: 1, // Ensure card is above background
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title>Workout Progress</Card.Title>
                                        <Pie
                                            data={{
                                                labels: ["Completed", "Remaining"],
                                                datasets: [
                                                    {
                                                        data: [workoutProgress.completed, workoutProgress.remaining],
                                                        backgroundColor: ["rgb(75, 192, 192)", "rgb(255, 99, 132)"],
                                                        hoverOffset: 4,
                                                    },
                                                ],
                                            }}
                                            options={{
                                                responsive: true,
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "Workout Completion Progress",
                                                    },
                                                },
                                            }}
                                            className="pie-chart"
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            )}
        </>
    );
}

export default Dashboard;
