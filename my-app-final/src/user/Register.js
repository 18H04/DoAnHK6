import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axiosClient from '../components/axiosClient';

function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const [message, setMessage] = useState('');

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { password, confirmpassword } = formData;

        if (password.trim() !== confirmpassword.trim()) {
            setError("Nhập sai mật khẩu ! Vui lòng thử lại");
            return;
        }
        console.log("Data: ", formData);
        try {
            const response = await axiosClient.post(`/Users/register`, null, {
              params: {
                Username: formData.username,
                Password: formData.password,
                Email: formData.email
              }
            });
            console.log(response.data);
            // If the request is successful, set a success message and log the response data
          if(response.status == 200){
            setMessage("Đăng ký thành công - Vui lòng bấm vào liên kết trong email để xác thực tài khoản")
            console.log("Đăng ký thành công");
           
          }
        } catch (error) {
            // If an error occurs during the request, set an error message and log the error
            setMessage('Đăng ký thất bại. Vui lòng thử lại.');
            console.error('Lỗi khi đăng ký:', error);
        }
    };
    return (
        <div className='bodyRegister'>
            <div class="container col-md-6">
                <div className='containerRegister'>
                    <form class="register-form">
                        <h2 className='dangky'>Đăng Ký</h2>
                        <div class="input-group">
                            <label className='labelRegister' for="username">Tên đăng ký:</label>
                            <input className='inputRegister' type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div class="input-group">
                            <label className='labelRegister' for="email">Email:</label>
                            <input className='inputRegister' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div class="input-group">
                            <label className='labelRegister' for="password">Mật khẩu:</label>

                            <input
                                class="inputLogin"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />


                        </div>
                        <div class="input-group">
                            <label className='labelRegister' for="repassword">Nhập lại mật khẩu:</label>
                            <input
                                class="inputLogin"
                                type={showPassword ? "text" : "password"}
                                name="confirmpassword"
                                onChange={handleChange}
                                value={formData.repassword}
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
                        </div>
                        <p style={{ color: 'red' }} > {error}</p>
                        <Button className='buttonDesig' type="submit" onClick={handleSubmit}>Đăng Ký</Button >
                        {message && <p>{message}</p>}
                    
                    </form>
                </div>
                
            </div>
        </div>




    );
}

export default RegisterForm;
