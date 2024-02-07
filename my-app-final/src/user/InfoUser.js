import React, { useState } from 'react';
import axiosClient from '../components/axiosClient';
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [account, setAccount] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const navigate = useNavigate();
    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };
    const handleChange = (e) => {
        setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleLogin = (e) => {
        e.preventDefault();
        axiosClient
            .post("/Users/login", account)
            .then((res) => {
                localStorage.setItem("jwt", res.data.token);
                localStorage.setItem("username", account.username);
                navigate("/Phones");
            })
            .catch((error) => {
                setErrorLogin("Sai tên đăng nhập hoặc mật khẩu ! ")
                console.error("Login failed:", error);
            });
    };

    return (
        
            <div className="login-container">
                <form className="register-form">

                    <h2 class="dangnhap">Đăng nhập</h2>
                    <label>
                        < span className='loginname'>
                            Tên đăng nhập:
                        </span>
                        <input
                            class="inputLogin"
                            type="text"
                            name="username"
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        <span className='loginpass'>
                            Mật khẩu:
                        </span>
                        <input
                            class="inputLogin"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            onChange={handleChange}
                        />
                        <Button
                            variant="light"
                            className="password-toggle"
                            onClick={handleTogglePassword}
                        >
                            <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                            />
                        </Button>
                    </label>
                    <p style={{ color: "red" }}>{errorLogin}</p>
                <button type="button" onClick={handleLogin} class="buttonDesig">
                        Đăng nhập
                    </button>
                    <a href="/forgotpassword" style={{color:'blue'}}>Quên mật khẩu</a>
                </form>

                
            </div>
       
        
    );
};

export default Login;
