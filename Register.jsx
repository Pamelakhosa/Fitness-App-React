import axios from "axios";
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Register() {
    var navigate = useNavigate();
    const [error, setError] = useState("");
    const email = useRef("");
    const username = useRef("");
    const password = useRef("");

    function handleRegister() {
        var payload = {
            email: email.current.value,
            username: username.current.value,
            password: password.current.value,
        };

        if (!email.current.value || !username.current.value || !password.current.value) {
            setError("Please fill in all fields");
            return;
        }

        if (!email.current.value.includes("@")) {
            setError("Email should have @ symbol");
            return;
        }

        if (password.current.value.length < 4) {
            setError("Password should be at least 4 characters");
            return;
        }

        axios
            .post("https://localhost:7182/api/Users/Register", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log("User registered: ", response.data);

                // Clear form fields
                email.current.value = "";
                username.current.value = "";
                password.current.value = "";

                // Show success message
                setError("Registration successful! You may proceed to sign in.");
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) {
                        setError("Email or username already exists");
                    } else {
                        setError("An error occurred. Please try again.");
                    }
                } else if (error.request) {
                    setError("No response from the server. Please check your connection.");
                } else {
                    setError("Request failed. Please try again.");
                }
                console.log(error);
            });
    }

    return (
        <div className="register-page">
            <div className="register-container">
                <h2 className="text-center">Register</h2>
                {error && <Alert variant="info">{error}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={email} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={username} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={password} />
                    </Form.Group>

                    <Button className="w-100 mb-2" variant="primary" onClick={handleRegister}>
                        Register
                    </Button>
                    <Button className="w-100" variant="secondary" onClick={() => navigate("/login")}>
                        Sign In
                    </Button>
                    <Button variant="light" className="mt-5" onClick={() => navigate("/")}>Back</Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;
