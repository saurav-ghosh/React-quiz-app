import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import Button from "./Button";
import CheckBox from "./CheckBox";
import Form from "./Form";
import InputField from "./InputField";

const SignupForm = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agree, setAgree] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Password don't match");
        }

        try {
            setError("");
            setIsLoading(true);
            await signup(userName, email, password);
            navigate("/");
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(error.message);
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <InputField
                type="text"
                placeholder="Enter name"
                icon="person"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <InputField
                type="text"
                placeholder="Enter email"
                icon="alternate_email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Enter password"
                icon="lock"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Confirm password"
                icon="lock_clock"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <CheckBox
                text="I agree to the Terms &amp; Conditions"
                required
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
            />

            <Button disabled={isLoading} type="submit" className="submitBtn">
                <span>Signup</span>
            </Button>

            {error && <p className="error">{error}</p>}

            <div className="info">
                Already have an account?
                <Link to="/login"> Login</Link> instead.
            </div>
        </Form>
    );
};

export default SignupForm;
