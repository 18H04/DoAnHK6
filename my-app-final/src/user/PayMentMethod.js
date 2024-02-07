// Import necessary libraries and components
import axiosClient from "../components/axiosClient";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// PaymentMethod component
const PayMentMethod = () => {
    // const [payUrl, setPayUrl] = useState(null);
    const navigate = useNavigate();
    const [payments, setPayments] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [price, setPrice] = useState(0);
    const [quantity,setQuantity] = useState(0);
    const [buyNowItem, setBuyNowItem] = useState(null);

    const formatPrice = (price) => {

        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    // Fetch total and buyNowItem from local storage
    useEffect(() => {
        const total = localStorage.getItem('total');
        if (total) {
            const parsedBuyNowItem = JSON.parse(total);
            setPrice(parsedBuyNowItem.price);
            setQuantity(parsedBuyNowItem.quantity);
        }

        const buyNowItemJSON = localStorage.getItem('ship-info');
        console.log ("info", buyNowItemJSON);
        if (buyNowItemJSON) {
            const parsedBuyNowItem = JSON.parse(buyNowItemJSON);
            setBuyNowItem(parsedBuyNowItem);
        }
    }, []);

    // Fetch payment methods from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/PaymentMethods');
                setPayments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        // Call fetchData function when the component is created
        fetchData();
    }, []);

    // Handle payment method change
    const handlePaymentMethodChange = (e) => {
        const selectedId = parseInt(e.target.value);
        const selectedMethod = payments.find((item) => item.id === selectedId);
        setSelectedPaymentMethod(selectedMethod);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedPaymentMethod && selectedPaymentMethod.id === 1) {
            navigate("/paymentconfirm", { state: { method: 1 } });
        }
        if (selectedPaymentMethod && selectedPaymentMethod.id === 2) {
            try {
                const response = await axiosClient.post("/PaymentMethods/MoMo", null, {
                    params: {
                        fullName: buyNowItem.fullName,
                        amount: parseFloat(price)
                    }
                });
                console.log("Data: ", buyNowItem.fullName, parseFloat(price));
                console.log(response.data.url);
                const url = response.data.url;
                window.open(url, '_blank');
            } catch (error) {
                console.error("Failed Payment:", error);
            }
        }
    };


    return (
        <>
            <div className="payment-container">
                <div className="payment-info">
                    <h2>Thông tin thanh toán</h2>
                    <p style={{color:"red"}}>Số lượng: {quantity}</p>
                    <p style={{color:"red"}}>Số tiền: {formatPrice(price)}</p>
                </div>
                <h2>Phương thức thanh toán</h2>
                <form onSubmit={handleSubmit} className="payment-form">
                    {payments.map((item) => (
                        <div key={item.id} className="payment-option">
                            <input
                                type="radio"
                                id={item.id}
                                name="paymentMethod"
                                value={item.id}
                                checked={selectedPaymentMethod && selectedPaymentMethod.id === item.id}
                                onChange={handlePaymentMethodChange}
                            />
                            <label className="payment-label" htmlFor={item.id}>{item.nameMethod}</label>
                        </div>
                    ))}
                    <button className="btnpayment" type="submit">Thanh Toán</button>
                </form>
            </div>
        </>
    );
};

export default PayMentMethod;
