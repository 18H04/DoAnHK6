import React from "react";
import Slider from "react-slick";

import "../../src/header.css";
import { Link } from "react-router-dom";
const QC = () => {
    {
        const settings = {
            nextArrow: <CustomNextArrow />,
            prevArrow: <CustomPrevArrow />,
            // dots: true,
            // infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true, // Cho phép chuyển động tự động
            autoplaySpeed: 2000, // Thời gian giữa các lần chuyển động
        };
        return (

            <Slider {...settings} className="container">


                <div className="slideshowQC">
                    <Link to="Sales">  <img className="imgSlide" src="asset/images/tet.jpg" alt="Slide 1" />
                    </Link>
                </div>
                <div className="slideshowQC">
                    <Link to="Sales">  <img className="imgSlide" src="asset/images/60.jpg" alt="Slide 2" />
                    </Link>
                </div>



            </Slider>



        );
    }
}

export default QC
const CustomNextArrow = ({ onClick }) => {
    return <></>;  // Trả về một phần tử rỗng
};

const CustomPrevArrow = ({ onClick }) => {
    return <></>;  // Trả về một phần tử rỗng
};
