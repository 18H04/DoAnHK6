import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axiosClient from '../components/axiosClient';

const PayMentConfirm = () => {
  const [shipinfo, setShipInfo] = useState(null);
  const infor = localStorage.getItem('ship-info');
  const [total,setTotal] = useState();
  useEffect(() => {
    const total = localStorage.getItem('total');
    console.log("total", total);
    setTotal(total.price);

    if (infor) {
      const parsedBuyNowItem = JSON.parse(infor);
      setShipInfo(parsedBuyNowItem);
      console.log("ship-info",parsedBuyNowItem);
    }
  }, [infor,total]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const status = params.get('errorcode');
  const orderId = params.get('orderid');
  const amount = params.get('amount');
  const date = params.get('date');

  const method = location.state?.method;

  const [confirmationStatus, setConfirmationStatus] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formattedDate = currentDate.toISOString();
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("method",method)
        if (method === 1) {
            const data = {
              IssuedDate: formattedDate, // Call toISOString on Date object
              ShippingAddress: (shipinfo ? shipinfo.shippingAddress : '').toString(), // Convert to string if defined
              ShippingPhone: (shipinfo ? shipinfo.shippingPhone : '').toString(), // Convert to string if defined
              Total: parseInt(shipinfo.total), // Convert to integer
              PaymentMethodId: 1,
              StatusPayment: 2,
            };
              console.log ("Data" , data);
              const response= await axiosClient.post('/Invoices/createinvoice', data)
              if (response.status == 200) {
                setConfirmationStatus('Đặt hàng thành công');
              }

        }
        else if (status === '0') {
            const data = {
                IssuedDate: date,
                ShippingAddress: shipinfo ? shipinfo.shippingAddress : '',
                ShippingPhone: shipinfo ? shipinfo.shippingPhone : '',
                Total: amount,
                PaymentMethodId: 2,
                StatusPayment: 1,
              };
              console.log ("Data" , data);
          await axiosClient.post('/Invoices/createinvoice', data);
          setConfirmationStatus('Thanh toán thành công');
        } else {
          setConfirmationStatus('Thanh toán thất bại - Vui lòng thử lại sau');
        }
      } catch (error) {
        console.error('Error in API call:', error);
        setConfirmationStatus('Có lỗi xảy ra');
      }
    };

    fetchData();
  }, [status]);

  return (
    <div>
      <h2></h2>
      <p style={{ color: "blue", fontSize: "20px" }}>{confirmationStatus}</p>
    </div>
  );
};

export default PayMentConfirm;
