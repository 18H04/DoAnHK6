import React, { useEffect, useState } from 'react';
import axiosClient from '../components/axiosClient';
import { Pagination } from 'react-bootstrap';
import ProductCardWishlist from '../components/ProductCardWishList';
import swal from 'sweetalert';
import ProductDetail from './ProductDetail';
const WishLists = (id) => {
    const [phones, setPhones] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(5);
    const username = localStorage.getItem('username');
    const api = 'http://localhost:7186/';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`WishLists/GetWishlist?userName=${username}`);
                console.log(response.data);
                setPhones(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage]);


    const DeleteAllWishList = async () => {
        axiosClient
            .delete(`Wishlists/DeleteAllWishList?username=${username}`)
            .then(() => {
                swal(
                    "Xóa thành công",
                    "Xóa danh sách yêu thích thành công!",
                    "warning"
                );
                window.location.reload();

            })
            .catch((error) => {
                console.error("Error", error);
            });

    };
    return (
        <>
            <div className="row isotope-grid ">
               
                    <button className='  btn btn-danger btn-delete-wishlist'
                        onClick={DeleteAllWishList} >
                        XÓA TẤT CẢ
                    </button>
                
                    {phones.map(item => (

                        <ProductCardWishlist
                            key={item.id}
                            phoneId={item.phoneId}
                            image={`https://localhost:7186/${item.phone.thumbnail}`}
                            name={item.phone.name}
                            description={item.phone.description}

                        />

                    ))}
                </div>
            
        </>
    );
};

export default WishLists;
