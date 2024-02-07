import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosClient from './axiosClient';
import swal from 'sweetalert';
const ProductCard = ({ id, thumbnail, name, description, stock }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const handleView = () => {
        const existingIdsString = localStorage.getItem('phoneId-view');
        const existingIds = existingIdsString ? JSON.parse(existingIdsString) : [];

        if (!existingIds.includes(id)) {
            existingIds.push(id);
            localStorage.setItem('phoneId-view', JSON.stringify(existingIds));
        }
        navigate(`/detail/${id}`)
    };
    const [isFavorite, setIsFavorite] = useState(false);

    const addFavorite = async () => {

        const response = await axiosClient.post(`Wishlists/CheckExists?username=${username}&productId=${id}`)
        console.log(response);
        if (response.data == true) {

            swal(
                "Cảnh báo",
                "Sản phẩm đã tồn tại trong danh sách yêu thích!",
                "warning"
            );
            return;
        }
        else {
            axiosClient
                .post(`Wishlists/addFavorite?username=${username}&productId=${id}`)
                .then(() => {
                    swal(
                        "Thành Công",
                        "Thêm vào danh mục yêu thích thành công!",
                        "success"
                    );
                })
                .catch((error) => {
                    console.error("Error", error);
                    swal("Thất bại", "Thêm vào danh mục yêu thích thất bại!", "error");
                });
        }
    };

  
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women">
            <div className="block2">
                <div className="block2-pic hov-img0">
                    <img className='imgPhones' src={image} alt={name} />
                    {/* 
                        <a href="#" className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                            Quick View
                        </a>
                    */}
                </div>

                <div className="block2-txt flex-w flex-t p-t-14">
                    <div className="block2-txt-child1 flex-col-l">
                        <button
                            type="button"
                            onClick={handleView}
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                        >
                            <span className='namePhones'>{name}</span>
                        </button>
                        <span className="descriptionPhones">{description}</span>
                        <span className="stext-105 cl3">
                            <span className='blinking-text'>Hiện Còn: {stock}</span>
                            <div className="star-rating">
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="star">&#9733;</span>
                                <span className="">&#9733;</span>
                            </div>
                        </span>
                    </div>

                    <div className="block2-txt-child2 flex-r p-t-3">

                        <div className="">
                            {/* <FavoriteButton isFavorite={isFavorite} onClick={handleToggleFavorite} /> */}

                            <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={addFavorite} title='Thêm yêu thích'>
                                <i>
                                    <FontAwesomeIcon icon={faHeart} />
                                    {/* <FontAwesomeIcon icon={isFavorite ? faHeart : faHeartBroken} /> */}
                                </i>
                                {isFavorite ? ' ' : ' '}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
