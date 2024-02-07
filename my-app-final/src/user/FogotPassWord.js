import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../components/axiosClient";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [retryCount, setRetryCount] = useState(0);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const isValidEmail = () => {
    return email.includes("@");
  };

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification({ type: "", message: "" });
    }, 60000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset notification
    setNotification({ type: "", message: "" });

    if (!isValidEmail()) {
      showNotification("error", "Email không hợp lệ");
      return;
    }

    try {
      console.log('Email gửi lên:', email);
      const response = await axiosClient.post('/Users/forgot-password', email);

      if (response.status === 200) {
        // Password reset successful
        showNotification("success", `Yêu cầu đặt lại mật khẩu đã gửi tới ${email} thành công.`);
        console.log('successful');
        // Reset state and disable button
        setIsButtonDisabled(true);
        setSecondsRemaining(60);
        setRetryCount(0);
        // Enable button after 60 seconds
        setTimeout(() => {
          setIsButtonDisabled(false);
          setSecondsRemaining(0);
        }, 60000);
      } else {
        // Handle errors from the server
        console.log('unsuccessful');
        showNotification("error", response.data.Message || "Couldn't send link to email, please try again later!");
        // Increment retry count
        setRetryCount(retryCount + 1);
        if (retryCount >= 2) {
          // Disable button after 3 retries
          setIsButtonDisabled(true);
          setSecondsRemaining(0);
          showNotification("error", "Quá nhiều thử lại. Vui lòng thử lại sau một thời gian.");
          setTimeout(() => {
            setIsButtonDisabled(false);
          }, 60000);
        } else {
          // Disable button after 3 retries
          setTimeout(() => setIsButtonDisabled(false), 60000);
        }
      }
    } catch (error) {
      console.error('An error occurred', error);
      showNotification("error", 'An error occurred while sending the email for password reset');
    }
  };

  useEffect(() => {
    // Set up the interval to count down the seconds
    const intervalId = setInterval(() => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      }
    }, 1000);

    // Clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, [secondsRemaining]);

  return (
    <>
      <div className="login-container">
                <form className="register-form">

                    <h2 class="dangnhap">Quên mật khẩu</h2>
                    <label>
                        < span className='loginname'>
                            Email:
                        </span>
                        <input
                            class="inputLogin"
                            type="text"
                            name="email"
                            onChange={handleChange}
                        />
                    </label>
                  
                <button type="button" onClick={handleSubmit} class="buttonDesig" disabled={isButtonDisabled}>
                        Xác nhận
                    </button>
                    {notification.type === "error" && (
          <p style={{ color: "red" }}>{notification.message}</p>
        )}
        {notification.type === "success" && <p>{notification.message}</p>}
        
        <p>{secondsRemaining > 0 ? `Gửi lại sau ${secondsRemaining} giây` : ""}</p>
                </form>
      
            </div>
    
        
        
      
    </>
  );
};

export default ForgotPassword;
