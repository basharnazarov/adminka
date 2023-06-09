import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (user) => {
        axios
            .post("https://webapp4-0tik.onrender.com/login", {
                username: user.username,
                password: user.password,
            })
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    setUser(response.data[0]);
                }
            });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
