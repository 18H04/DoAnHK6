import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axiosClient from './axiosClient';
import swal from 'sweetalert';
const ProductCardWishlist = ({ phoneId, image, name, description, stock }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
   
    
    const deletewishlist = async () => {
        try {
            await axiosClient.post(`Wishlists/DeleteWishList`, null, {
                params: {
                    username: username,
                    phoneId: phoneId
                }
            });
    
            swal(
                "Xóa thành công",
                "Xóa sản phẩm khỏi danh sách yêu thích thành công!",
                "warning"
            );
    
            window.location.reload();
        } catch (error) {
            console.error("Error", error);
            // swal("Thất bại", "Thêm vào danh mục yêu thích thất bại!", "error");
        }
    };
    return (
           
            <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">

                <div className="block2" style={{ height: '400px' }}>
                    <button className='btn btn-outline-danger deletewishlist'
                        onClick={deletewishlist}
                    >
                        X
                    </button>

                    <div className="block2-pic hov-img0">
                        <img className='imgPhones' src={image} alt={name} />

                    </div>

                    <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l">
                            <button
                                type="button"
                                className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        >
                           
                          <Link to={`/detail/${phoneId}`}>
  <span className='namePhones'>{name}</span>
</Link>
                            </button>
                            <span className="descriptionPhones">{description}</span>
                            <span className="stext-105 cl3">
                                <div className="star-rating">
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="star">&#9733;</span>
                                    <span className="">&#9733;</span>
                            </div>
                            
                            </span>
                        </div>

                    </div>

                </div>

            </div>
       
    );
}

export default ProductCardWishlist;
