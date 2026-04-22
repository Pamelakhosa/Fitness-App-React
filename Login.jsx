import axios from "axios";
import { useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function Login() {
    var navigate = useNavigate();
    const [error, setError] = useState("");
    const username = useRef("");
    const password = useRef("");

    function handleLogin() {
        var payload = {
            username: username.current.value,
            password: password.current.value,
        };

        if (!username.current.value || !password.current.value) {
            setError("Please fill in all fields");
            return;
        }

        if (password.current.value.length < 4) {
            setError("Password should be at least 4 characters");
            return;
        }

        axios
            .post("https://localhost:7182/api/Users/Login", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                console.log("User logged in: ", response.data.token);
                navigate("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                setError("Invalid credentials");
            });
    }

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="text-center">Sign In</h2>
                {error && <Alert variant="info">{error}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" ref={username} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={password} />
                    </Form.Group>

                    <Button className="w-100 mb-2" variant="primary" onClick={handleLogin}>
                        Sign In
                    </Button>
                    <Button className="w-100" variant="secondary" onClick={() => navigate("/register")}>
                        Register
                    </Button>
                    <Button variant="light" className="mt-5" onClick={() => navigate("/")}>Back</Button>
                </Form>
            </div>
        </div>
        
    );
}

export default Login;
