import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Admin from "./Admin";
import Register from "./Register";
import RequireAuth from "./RequireAuth";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function App() {
  const [data, setData] = React.useState('sssaaa')
  // const navigate = useNavigate()
  const handleLogin = (e, username, password) => {
    e.preventDefault();
    axios
        .post("http://localhost:3001/login", {
            username: username,
            password: password,
        })
        .then((response) => {
            if (response.data.message) {
                console.log(response.data.message);
            } else {
               setData(response.data[0])
               
            }
           
        });
};


React.useEffect(() => {
  console.log(data)
  localStorage.setItem("userData", JSON.stringify(data));

}, [data]);

    return (
        <BrowserRouter >
            <Routes >
                <Route path="/" element={<Login handleLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth data={data}/>}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
