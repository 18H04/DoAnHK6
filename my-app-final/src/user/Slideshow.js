import React from "react";
import Slider from "react-slick";
import "../../src/App.css";
import { Link } from "react-router-dom";

const Slideshow = () => {
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
			autoplaySpeed: 1450, // Thời gian giữa các lần chuyển động
		};
		return (

			<Slider {...settings}>


				<div className="slideshow">
					<img className="imgslideshow" src="./asset/anh1.jpg" alt="Slide 1" />
				</div>
				<div className="slideshow">
					<img className="imgslideshow" src="./asset/anh2.jpg" alt="Slide 2" />
				</div>
				<div className="slideshow">
					<img className="imgslideshow" src="./asset/anh3.jpg" alt="Slide 3" />
				</div>
				<div className="slideshow">
					
				<img className="imgslideshow" src="./asset/anh4.jpg" alt="Slide 4" />
				</div>

			</Slider>



		);
	}
}

export default Slideshow
const CustomNextArrow = ({ onClick }) => {
	return <></>;  // Trả về một phần tử rỗng
};

const CustomPrevArrow = ({ onClick }) => {
	return <></>;  // Trả về một phần tử rỗng
};