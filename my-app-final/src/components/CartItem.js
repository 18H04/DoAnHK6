import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosClient from './axiosClient';
import swal from 'sweetalert';
import { MdDelete } from 'react-icons/md';
const CartItem = ({ product, onQuantityChange, onDelete }) => {
    const [image, setImage] = useState([]);
    const [quantity, setQuantity] = useState(product.quantity);
    const [totalPrice, setTotalPrice] = useState(product.phoneModel.price * quantity);
  

    const formatPrice = (price) => {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    useEffect(() => {
      const fetchImages = async () => {
        try {
          const response = await axiosClient.get('/Images/getimagesbyphoneid', {
            params: {
              PhoneId: product.phoneModel.phoneId,
              ColorId: product.color.id,
            },
          });
          const existingData = JSON.parse(localStorage.getItem('imageData')) || [];
          const exists = existingData.some((item) => (
            item.phoneId === product.phoneModel.phoneId &&
            item.colorId === product.color.id
          ));
    
          if (!exists) {
            const newData = [...existingData, {
              phoneId: product.phoneModel.phoneId,
              colorId: product.color.id,
              imageData: response.data[0].name,
            }];
        
            localStorage.setItem('imageData', JSON.stringify(newData));
          }
         console.log(response.data);
          setImage(response.data);
        } catch (error) {
          console.error('Failed to fetch images', error.message);
          
        }
      };

      fetchImages();
    }, [product.phoneModel.phoneId, product.color.id]);

    useEffect(() => {
      const newTotalPrice = product.phoneModel.price * quantity;
      setTotalPrice(newTotalPrice);
    }, [quantity, product.phoneModel.price]);

    const updateQuantityOnServer = async (newQuantity) => {
        try {
            const response = await axiosClient.post(`/Carts/updateitem`, null, {
                params: {
                    PhoneModelId: product.phoneModel.id,
                    Quantity: newQuantity,
                },
            });
            if (response.status === 200) {
                setQuantity(newQuantity);
                // Notify the parent (ProductCart) about the quantity change
                onQuantityChange(product.id, newQuantity);
            }
        } catch (error) {
            console.error('Failed to update quantity on the server', error.message);
        }
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        updateQuantityOnServer(quantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            updateQuantityOnServer(quantity - 1);
        }
    };
    const handleDelete = async () => {
        const confirmDelete = await swal({
            title: "Xác nhận",
            text: "Bạn có muốn xóa sản phẩm?",
            icon: "warning",
            buttons: ["Hủy", "Xóa"],
            dangerMode: true,
          });
      if(confirmDelete){
        try {
            const response = await axiosClient.post(`/Carts/deleteitem`, null, {
                params: {
                    phoneModelId: product.phoneModel.id,
                },
            });
    
            if (response.status === 200) {
                // Notify the parent (ProductCart) about the item deletion
                onDelete(product.id);
    
                // Display SweetAlert notification
                swal({
                    title: "Xóa thành công",
                    text: "Xóa sản phẩm thành công!",
                    icon: "success",
                });
                window.location.reload();

            }
        } catch (error) {
            console.error('Failed to delete item on the server', error.message);
        }}
    };

    return (
        <div>
            <div className="sizecart">
                <div className="container">
                    <div className="containercart">
                        <div className="row">
                            <div className="col-md-6">
                                <table>
                                    <tbody>
                                        <tr className="brandname">
                                            <td>{product.name} {product.storage.name} {product.color.name}</td>
                                        </tr>
                                        <tr>
                                            <td >
                                                {image.length > 0 && (
                                                    <img className='imgcart' src={`https://localhost:7186/${image[0].name}`} alt={`Product: ${product.name}`} />
                                                )}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-6">
                                <table>
                                    <tbody className="OnQuality">
                                        <tr >
                                            <td className='priceCart' style={{ color: "red" }}>{formatPrice(totalPrice)}</td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <div className="quantity-container">
                                                    <div className="quantity-control">
                                                        <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                                                        <input type="text" className="quantity-input" value={quantity} readOnly />
                                                        <button className="quantity-button" onClick={increaseQuantity}>+</button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                    
                                    <tr>
                                        <td>
                                        <button className="btn-btn delete" onClick={handleDelete}>
                                       <MdDelete />
            
                                                </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CartItem;
