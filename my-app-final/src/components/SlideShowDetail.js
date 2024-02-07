import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axiosClient from '../components/axiosClient';

const SlideshowDetail = ({ id, colorId,onImageNameChange}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [pauseSlide, setPauseSlide] = useState(false);
    const [startIndex, setStartIndex] = useState(0);

    const handleViewMore = (direction) => {
        if (direction === 'next') {
            setStartIndex((prevIndex) => prevIndex + 4);
        } else if (direction === 'prev') {
            setStartIndex((prevIndex) => Math.max(0, prevIndex - 4));
        }
    };

    const visibleImages = images.slice(startIndex, startIndex + 4);
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosClient.get(`/Images/getimagesbyphoneid?PhoneId=${id}`);
                setImages(response.data);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [id]);

    
    useEffect(() => {
        if (images.length > 0 && colorId) {
            const indexWithColorId = images.findIndex((image) => image.colorId === colorId);
            setCurrentImageIndex(indexWithColorId !== -1 ? indexWithColorId : currentImageIndex)
            onImageNameChange(`https://localhost:7186/${images[indexWithColorId].name}`);
        }

        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [images, colorId, pauseSlide,onImageNameChange]);

    const handleNext = () => {
        if (images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
    };

    const handlePrev = () => {
        if (images.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        }
    };


    // if (!images || images.length === 0 || !images[currentImageIndex]) {
    //     return <div>No images available</div>;
    // }
    const handleThumbnailClick = (index) => {
        setCurrentImageIndex(index);
        setPauseSlide(true); // Tạm ngừng slide khi người dùng chọn ảnh từ ThumbnailContainer
    };

    const handleResumeSlide = () => {
        setPauseSlide(false); // Tiếp tục slide khi người dùng kết thúc chọn ảnh từ ThumbnailContainer
    };


    if (!images || images.length === 0 || !images[currentImageIndex]) {
        return <div>No images available</div>;
    }

    return (
        <div>
            <div className='DetailSlideShow'>
                <div className=''>
                    <button className='buttonslide' onClick={handlePrev}>
                        <FaChevronLeft />
                    </button>
                    <img className='imgDetails'
                        src={`https://localhost:7186/${images[currentImageIndex].name}`}
                        alt={`Slide ${currentImageIndex + 1}`}
                        style={{ maxWidth: '100%' }}
                    />
                    <button className='buttonslide' onClick={handleNext}>
                        <FaChevronRight />
                    </button>
            </div>
               
            </div >
            <div className='DetailSlideShow' onMouseLeave={handleResumeSlide}>
                    <button className='buttonslide' onClick={() => handleViewMore('prev')} disabled={startIndex === 0}>
                        <FaChevronLeft />
                    </button>
                    {visibleImages.map((image, index) => (
                        <img
                            key={index + startIndex}
                            src={`https://localhost:7186/${image.name}`}
                            alt={`Thumbnail ${index + startIndex + 1}`}
                            className={`thumbnail ${index + startIndex === currentImageIndex ? 'selected' : ''}`}
                            onClick={() => handleThumbnailClick(index + startIndex)}
                        />
                    ))}
                    <button className='buttonslide' onClick={() => handleViewMore('next')} disabled={startIndex + 4 >= images.length}>
                        <FaChevronRight />
                    </button>
               
                
            </div>
            
        </div>
    );
};

export default SlideshowDetail;
