import React, { useEffect, useState } from "react";
import axiosClient from "../components/axiosClient";
import ProductCard from "../components/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ViewProduct = () => {
  const [idPhone, setIdPhone] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const idPhones = localStorage.getItem("phoneId-view");
    if (idPhones) {
      setIdPhone(JSON.parse(idPhones));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = idPhone.map(async (id) => {
          const response = await axiosClient.get(`/Phones/${id}`);
          return response.data;
        });

        const data = await Promise.all(requests);
        setResponseData(data);
        if (idPhone.length > 0) {
          setShowSlider(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [idPhone]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4, // Show 4 cards at a time
    slidesToScroll: 1,
    variableHeight: false,
  };

  return (
    <div>
  <div className="row isotope-grid">
    {showSlider && (
      <React.Fragment>
        
          <h3>Sản phẩm bạn vừa quan tâm</h3>
          {/* <Slider {...settings}> */}
          {responseData.map((item) => (
            <ProductCard
              id={item.id}
              image={`https://localhost:7186/${item.thumbnail}`}
              name={item.name}
              description={item.description}
              stock={item.stock}
            />
          ))}
          {/* </Slider> */}
      </React.Fragment>
    )}
  </div>
  <hr /> 
</div>
   
  );
};

export default ViewProduct;
