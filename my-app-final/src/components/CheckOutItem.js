import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosClient from './axiosClient';
import swal from 'sweetalert';
import { MdDelete } from 'react-icons/md';

const CheckOutItem = ({ product, onQuantityChange }) => {
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
        const exists = existingData.some(
          (item) =>
            item.phoneId === product.phoneModel.phoneId && item.colorId === product.color.id
        );

        if (!exists) {
          const newData = [
            ...existingData,
            {
              phoneId: product.phoneModel.phoneId,
              colorId: product.color.id,
              imageData: response.data[0].name,
            },
          ];

          localStorage.setItem('imageData', JSON.stringify(newData));
        }

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
 
  return (
    <>
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          {image.length > 0 && (
            <img
            className="img-fluid rounded-start"
            style={{ width: '100%', height: '100%', position: 'relative', left: 0 }}
              src={`https://localhost:7186/${image[0].name}`}
              alt={`Product: ${product.phoneModel.name}`}
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{product.name} {product.storage.name} {product.color.name}</h5>
            <p className="card-text">Đơn giá: {formatPrice(product.phoneModel.price)}</p>
            <p className="card-text">Số lượng: {product.quantity}</p>
            <p className="card-text">
              Thành tiền:{formatPrice(totalPrice)}
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
  
  );
        };
export default CheckOutItem;
