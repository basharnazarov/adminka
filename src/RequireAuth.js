import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./auth";

const RequireAuth = () => {
    const isAuth = useAuth();
    return isAuth.user ? <Outlet /> : <Login />;
};

export default RequireAuth;
