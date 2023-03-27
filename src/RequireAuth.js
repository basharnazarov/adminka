import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
const useAuth = (data) => {
    const user = { loggedIn: false };
    user.loggedIn = data?.email ? true : false;
    console.log(user.loggedIn)
    return user && user.loggedIn;
};

const RequireAuth = (props) => {
    
    let data = '';
    React.useEffect(()=>{
        data = JSON.parse(localStorage.getItem("userData"));

        console.log('auth', props.data)
    },[props.data])
    
    const isAuth = useAuth(data);
    return isAuth ? <Outlet /> : <Login />;
};

export default RequireAuth;
