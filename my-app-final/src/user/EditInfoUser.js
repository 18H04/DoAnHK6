import React, { useEffect, useState } from 'react';
import axiosClient from '../components/axiosClient';
import { useNavigate } from 'react-router-dom';

const formatDateString = (rawDate) => {
    return rawDate ? rawDate.split('-').reverse().join('-') : '';
};

const EditInfoUser = () => {
    const navigate = useNavigate();
    const [inforUser, setInforUser] = useState({});
    const [fullNameValue, setFullNameValue] = useState('');
    const [phoneNumberValue, setPhoneNumberValue] = useState('');

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await axiosClient.get('/Users/user-infor');
                setInforUser(response.data);
                setFullNameValue(response.data.fullName || '');
                setPhoneNumberValue(response.data.phoneNumber || '');
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };

        // Call the function to fetch user information
        fetchUserInformation();
    }, []);

    const handleInputChange = (e) => {
        const rawValue = e.target.value;
        let formattedValue = rawValue;

        if (e.target.name === 'birthDay') {
            formattedValue = formatDateString(rawValue);
        }

        setInforUser((prevInforUser) => ({
            ...prevInforUser,
            [e.target.name]: formattedValue,
        }));

        if (e.target.name === 'fullName') {
            setFullNameValue(formattedValue);
        } else if (e.target.name === 'phoneNumber') {
            setPhoneNumberValue(formattedValue);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSend = {
                fullName: fullNameValue,
                phoneNumber: phoneNumberValue,
                birthDay: formatDateString(inforUser.birthDay),
            };

            const response = await axiosClient.post('/Users/update-user-infor', dataToSend);
            console.log("User post: ", dataToSend);

            console.log('Request completed. Status code:', response.status);

            if (response.status === 200) {
                console.log('User information updated successfully!');
                navigate(`/infouser`)
            } else {
                console.error('Error updating user information. Unexpected status code:', response.status);
            }
        } catch (error) {
            console.error('Error updating user information:', error);
        }
    }

    const formattedDate = inforUser.birthDay ? formatDateString(inforUser.birthDay) : '';

    return (
        <div className='bodyRegister'>
            <div className='containerRegister'>
                <form className="register-form" onSubmit={handleSubmit}>
                    <h2 className='KhachHang'>Chỉnh sửa thông tin</h2>
                    <div className="input-group">
                        <label className='labelRegister' htmlFor="name">Họ và Tên:</label>
                        <input
                            className='inputRegister'
                            type="text"
                            id="name"
                            name="fullName"
                            value={fullNameValue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label className='labelRegister' htmlFor="phonenumber">SĐT:</label>
                        <input
                            className='inputRegister'
                            type="text"
                            id="phonenumber"
                            name="phoneNumber"
                            value={phoneNumberValue}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-group">
                        <label className='labelRegister' htmlFor="date">Ngày Sinh:</label>
                        <input
                            className='inputRegister'
                            type="date"
                            id="date"
                            name="birthDay"
                            value={formattedDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button className='buttonDesig' type="submit">Xác Nhận</button>
                </form>
            </div>
        </div>
    );
};

export default EditInfoUser;
