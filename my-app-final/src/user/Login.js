import React, { useState, useEffect } from 'react';
import axiosClient from '../components/axiosClient';
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoggedIn }) => {
    const [account, setAccount] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorLogin, setErrorLogin] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setLoggedIn(true);
            navigate("/Phones");
        }
    }, [setLoggedIn, navigate]);

    const handleChange = (e) => {
        setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!account.username || !account.password) {
            setErrorLogin("Vui lòng nhập tên đăng nhập và mật khẩu.");
            return;
        }

        axiosClient
            .post("/Users/login", account)
            .then((res) => {
                localStorage.setItem("jwt", res.data.token);
                localStorage.setItem("username", account.username);
                navigate("/Phones");
            })
            .catch((error) => {
                if (error.response) {
                    setErrorLogin("Sai tên đăng nhập hoặc mật khẩu.");
                    console.error("Login failed:", error.response.data);
                } else if (error.request) {
                    setErrorLogin("Không thể kết nối đến máy chủ.");
                    console.error("No response received:", error.request);
                } else {
                    setErrorLogin("Đã xảy ra lỗi khi đăng nhập.");
                    console.error("Error setting up the request:", error.message);
                }
            });
    };

    return (
        <div className="login-container">
            <form className="register-form">
                <h2 className="dangnhap">Đăng nhập</h2>
                <label>
                    <span className="loginname">Tên đăng nhập:</span>
                    <input
                        className="inputLogin"
                        type="text"
                        name="username"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    <span className="loginpass">Mật khẩu:</span>
                    <input
                        className="inputLogin"
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
                <button type="button" onClick={handleLogin} className="buttonDesig">
                    Đăng nhập
                </button>
                <a href="/forgotpassword" style={{ color: 'blue' }}>Quên mật khẩu</a>
            </form>
        </div>
    );
};

export default Login;
