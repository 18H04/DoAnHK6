import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../components/axiosClient';

const ResetPassword = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('token');
  const email = params.get('email');

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [result, setResult] = useState('');
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (password.length >= 6) {
    
      setError('');
    } else {
      setError('Password should be at least 6 characters long');
      return;
    }

    // Password matching check
    if (password.trim() === confirmPassword.trim()) {
      setError('');
    } else {
      setError("Passwords didn't match.");
      return;
    }
    const requestData = {
      token,
      email,
      password,
      confirmPassword
    };
    console.log('Data to be sent to the server:', requestData);
    try {
      const response = await axiosClient.post('/Users/reset-password', requestData);

      if (response.status === 200) {
        // Password reset successful
        setResult('Password reset successful');
        console.log('Password reset successful');
      } else {
        // Handle errors from the server
        setError(response.data.Message || 'Password reset failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
      setError('An error occurred while resetting the password');
    }
  };

  return (
    <div className='bodyRegister'>
      <div class="container col-md-6">
        <div className='containerRegister'>
          <Form className="register-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mật khẩu: </Form.Label>
              <Form.Control
                className="resetPassword"
                type={showPassword ? 'text' : 'password'}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu: </Form.Label>
              <Form.Control
                className="resetPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                variant="light"
                className="password-toggle"
                onClick={handleTogglePassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            </Form.Group>
            <p style={{ color: 'red' }}>{error}</p>
            <p style={{ color: 'green' }}>{result}</p>
            <button type="submit" variant="success" className='buttonDesig'>
              <FontAwesomeIcon icon={faCheck} /> Reset
            </button>
          </Form>

        </div>
      </div>
    </div>

  );
};

export default ResetPassword;
