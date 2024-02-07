import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import axiosClient from '../components/axiosClient';


const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPassword = formData.newPassword;

    if (newPassword.length >= 6 && /\d/.test(newPassword)) {
      setError('');
    } else {
      setError('Mật khẩu phải dài hơn 6 kí tự và ít nhất phải có 1 chữ số');
      return;
    }

    if (password.trim() === confirmPassword.trim()) {
      setError('');
    } else {
      setError("Mật khẩu lần 1 và lần 2 không khớp. Vui lòng kiểm tra lại.");
      return;
    }
    console.log("Post:", formData);
    try {
      const response = await axiosClient.post(`/Users/changepassword`, null, {
        params: {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
      });

      if (response.status === 200) {
        console.log('Password changed successfully');
        setResult('Đổi mật khẩu thành công');
      } else {
        console.error('Failed to change password');
        setError('Đổi mật khẩu thất bại');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Error changing password. Please try again.');
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
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Mật khẩu mới: </Form.Label>
              <Form.Control
                className="resetPassword"
                type={showPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={(e) => {
                  handleChange(e);
                  setPassword(e.target.value);
                }}
              />

            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Xác nhận mật khẩu mới: </Form.Label>
              <Form.Control
                className="resetPassword"
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <Button
                variant="light"
                className="password-toggle"
                onClick={handleTogglePassword}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </Button>
            <p style={{ color: 'red' }}>{error}</p>
            <p style={{ color: 'green' }}>{result}</p>
            <button type="submit" variant="success" className='buttonDesig'>
              <FontAwesomeIcon icon={faCheck} />Đổi mật khẩu 
            </button>
          </Form>

        </div>
      </div>
    </div>

  );
};

export default ChangePassword;
