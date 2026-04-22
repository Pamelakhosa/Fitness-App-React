import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Form, Alert, Container, Row, Col, Image, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Profile() {
    var navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Define state for user details
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPic, setUserPic] = useState("");
    const [userId, setUserId] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showModal, setShowModal] = useState(false); // Modal state

    // List of 5 avatar URLs
    const avatarOptions = [
        "https://cdn-icons-png.flaticon.com/512/147/147144.png",
        "https://cdn-icons-png.flaticon.com/512/168/168734.png",
        "https://cdn-icons-png.flaticon.com/512/921/921071.png",
        "https://cdn-icons-png.flaticon.com/512/1154/1154471.png",
        "https://cdn-icons-png.flaticon.com/512/3006/3006872.png"
    ];

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserName(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]);
                const extractedUserId =
                    decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

                setUserId(extractedUserId);
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            setShowModal(true); // Show the modal if no token is found
        }
    }, [token]);

    useEffect(() => {
        if (userId) {
            // Fetch user details from API
            axios.get(`https://localhost:7182/api/Users/GetUserById/${userId}`)
                .then((response) => {
                    setUserEmail(response.data.email);
                    setUserPic(response.data.profileImageUrl || null);
                })
                .catch((error) => {
                    console.log("Error fetching user data:", error);
                });
        }
    }, [userId]);

    function handleSaveChanges() {
        const payload = { username: userName, email: userEmail, profileImage: userPic };

        axios.put(`https://localhost:7182/api/Users/UpdateUser/${userId}`, payload, {
            headers: { "Content-Type": "application/json" }
        })
            .then(() => {
                setSuccess("Profile updated successfully!");
                setError("");
            })
            .catch((error) => {
                setError("Failed to update profile. Try again.");
                setSuccess("");
                console.log("Update error:", error);
            });
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function handleSignInRedirect() {
        navigate("/login");
    }

    return (
        <>
            {/* Modal for not signed in */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You need to sign in to view and edit your profile.
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
                <div className="profile-page">
                    <Container className="d-flex justify-content-center align-items-center vh-100">
                        <Row className="profile-container p-4">
                            {/* Left: Profile Picture */}
                            <Col md={4} className="text-center">
                                <Image
                                    src={userPic && userPic.trim() !== "string" ? userPic : "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"}
                                    roundedCircle
                                    className="profile-image"
                                />

                                <h3 className="mt-3">{userName}</h3>
                                <p className="text-muted">{userEmail}</p>
                            </Col>

                            {/* Right: Editable User Info */}
                            <Col md={8}>
                                <h2 className="mb-4">Edit Profile</h2>

                                {error && <Alert variant="danger">{error}</Alert>}
                                {success && <Alert variant="success">{success}</Alert>}

                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={userName}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={userEmail}
                                            onChange={(e) => setUserEmail(e.target.value)}
                                        />
                                    </Form.Group>

                                    {/* Avatar Selection */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select an Avatar</Form.Label>
                                        <div className="avatar-selection d-flex justify-content-between">
                                            {avatarOptions.map((avatar, index) => (
                                                <Image
                                                    key={index}
                                                    src={avatar}
                                                    roundedCircle
                                                    className={`avatar-option ${userPic === avatar ? "selected-avatar" : ""}`}
                                                    onClick={() => setUserPic(avatar)}
                                                    style={{ width: "50px", height: "50px", cursor: "pointer", border: userPic === avatar ? "3px solid #007bff" : "none" }}
                                                />
                                            ))}
                                        </div>
                                    </Form.Group>

                                    <Button className="w-100 mb-3" variant="primary" onClick={handleSaveChanges}>
                                        Save Changes
                                    </Button>
                                </Form>

                                {/* Log Out Button */}
                                <Button className="logout-btn" variant="danger" onClick={handleLogout}>
                                    Log Out
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    {/* Background Image with Blur */}
                    <div className="profile-bg"></div>

                    {/* Back Button */}
                    <Button className="back-btn" variant="light" onClick={() => navigate("/")}>
                        Back
                    </Button>
                </div>
            )}
        </>
    );
}

export default Profile;
