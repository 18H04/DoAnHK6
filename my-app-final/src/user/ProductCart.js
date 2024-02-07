import React, { useEffect, useState } from 'react';
import axiosClient from '../components/axiosClient';
import CartItem from '../components/CartItem';
import swal from 'sweetalert';
import { Navigate, useNavigate } from 'react-router-dom';

const ProductCart = () => {
  const navigate = useNavigate();
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const [cartItems, setCartItems] = useState([]);
  const [totalAllPrices, setTotalAllPrices] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/Carts/getitem`);
        setCartItems(response.data);

        // Calculate and set totalAllPrices after updating cartItems
        const totalPrice = response.data.reduce((total, item) => {
          return total + item.quantity * item.phoneModel.price;
        }, 0);

        setTotalAllPrices(totalPrice);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the quantity of the specific item in the cartItems state
    const updatedCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCartItems);


    const updatedTotalPrice = updatedCartItems.reduce((total, item) => {
      return total + item.quantity * item.phoneModel.price;
    }, 0);

    setTotalAllPrices(updatedTotalPrice);
  };

  const handleItemDelete = (itemId) => {
  
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);

    setCartItems(updatedCartItems);

    // Recalculate totalAllPrices based on the updated cartItems
    const updatedTotalPrice = updatedCartItems.reduce((total, item) => {
      return total + item.quantity * item.phoneModel.price;
    }, 0);

    setTotalAllPrices(updatedTotalPrice);
  };

  const deleteAllItem = async () => {
    const confirmDelete = await swal({
      title: "Xác nhận",
      text: "Bạn có muốn xóa hết tất cả sản phẩm?",
      icon: "warning",
      buttons: ["Hủy", "Xóa"],
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        const response = await axiosClient.post(`/Carts/deleteallitem`);

        if (response.status === 200) {
          swal("Thành công", "Đã xóa hết sản phẩm khỏi giỏ hàng!", "success");
          setCartItems([]);
          setTotalAllPrices(0);
        }
      } catch (error) {
        console.error("Failed to delete all items on the server", error.message);
      }
    }
  };
  const checkout = () =>
  {
    navigate(`/checkout`);
  }
  return (
    <>
      <div className="container">
        <div className="containercart">
          <div className="row rowCart">
            <div className="delete">
              <button onClick={deleteAllItem}>Xóa tất cả</button>
            </div>
            <div className="sizecart">
          
              <div className="app">
                <div className="shopping-cart">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      product={item}
                      onQuantityChange={handleQuantityChange}
                      onDelete={handleItemDelete}
                    />
                  ))}
                </div>
              </div>
              <p style={{color: "red"}}>Tổng giá trị đơn hàng: {formatPrice(totalAllPrices)}</p>
            </div>
          </div>
        </div>
        <div className="delete">
              <button onClick={checkout}>Thanh toán</button>
            </div>
      </div>
    </>
  );
};

export default ProductCart;
