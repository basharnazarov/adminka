import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "./auth";

const RequireAuth = () => {
    const isAuth = useAuth();
    console.log(isAuth.user);
    return isAuth.user ? <Outlet /> : <Login />;
};

export default RequireAuth;
