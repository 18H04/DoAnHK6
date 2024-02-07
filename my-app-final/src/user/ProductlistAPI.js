import React, { useEffect, useState } from 'react';
import axiosClient from '../components/axiosClient';
import ProductCard from '../components/ProductCard';
import { Pagination } from 'react-bootstrap';
import ViewProduct from './ViewProduct';

const ProductListAPI = () => {
  const [phones, setPhones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const api = 'http://localhost:7186/';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/Phones?PageNumber=${currentPage}`);
        console.log(response.data);
        setPhones(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ViewProduct/>

      
      <div className="row isotope-grid">
        {phones.map(item => (

          <ProductCard
            key={item.id}
            id={item.id}
            image={`https://localhost:7186/${item.thumbnail}`}
            name={item.name}
            description={item.description}
            stock={item.stock}
          />

        ))}
      </div>

      <Pagination>
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default ProductListAPI;
