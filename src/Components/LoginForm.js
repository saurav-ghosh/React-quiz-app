import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import InputField from "./InputField";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setError("");
            await login(email, password);
            setIsLoading(true);
            navigate(from, { replace: true });
        } catch (error) {
            setError(error.code);
            setIsLoading(false);
        }
    }

    return (
        <Form onSubmit={handleLogin}>
            <InputField
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                required
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button disabled={isLoading} type="submit" className="submitBtn">
                <span>Login</span>
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">
                Don't have an account?
                <Link to="/signup"> Signup</Link> instead.
            </div>
        </Form>
    );
};

export default LoginForm;
