import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Contexts/AuthContext";
import "../Styles/App.css";
import Layout from "./Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import Signup from "./Pages/Signup";
import PublicRoute from "./PublicRoute";
import RequireAuth from "./RequireAuth";

const App = () => {
    return (
        <AuthProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/*" element={<RequireAuth />}>
                        <Route path="quiz/:id" element={<Quiz />} />
                        <Route path="result/:id" element={<Result />} />
                    </Route>
                    <Route path="/*" element={<PublicRoute />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="login" element={<Login />} />
                    </Route>
                </Routes>
            </Layout>
        </AuthProvider>
    );
};

export default App;
