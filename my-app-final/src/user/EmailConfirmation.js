import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const EmailConfirmation = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get('status');

    const [confirmationStatus, setConfirmationStatus] = useState(null);

    useEffect(() => {
        if (status === 'success') {
                setConfirmationStatus('Xác nhận thành công');
        } else if (status === 'failed') {
            setConfirmationStatus('Xác nhận thất bại');
        } else  {
            setConfirmationStatus('Trạng thái không xác định');
        }
    }, [status]);

    return (
        <div>
            <h2>Email Confirmation</h2>
            <p className='emaiConfir'>{confirmationStatus}</p>
        </div>
    );
};

export default EmailConfirmation;
