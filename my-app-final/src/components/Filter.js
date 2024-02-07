
import React, { useState, useEffect } from 'react';
import axiosClient from '../components/axiosClient';
import { Accordion } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Filter = () => {
    const navigate=useNavigate();

    const [colors, setColors] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const [storages, setStorages] = useState([]);
    const [selectedStorages, setSelectedStorages] = useState([]);

    const [selectedRams, setSelectedRams] = useState([]);
    const [rams, setRams] = useState([]);

    const [brands, setBrands] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sliderValue, setSliderValue] = useState([0, 60000000]);

    const [dataFilter, setDataFilter] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const color = await axiosClient.get('/Colors');
                setColors(color.data);
                const storage = await axiosClient.get('/Storages');
                setStorages(storage.data);
                const brand = await axiosClient.get('/Brands');
                setBrands(brand.data);
                const ram = await axiosClient.get('/Rams');
                setRams(ram.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, []);

    const handleRamChange = (ramId) => {
        setSelectedRams((prevSelectedRams) => {
            if (prevSelectedRams.includes(ramId)) {
                return prevSelectedRams.filter((id) => id !== ramId);
            } else {
                return [...prevSelectedRams, ramId];
            }
        });
    };

    const handleColorChange = (colorId) => {
        setSelectedColors((prevSelectedColors) => {
            if (prevSelectedColors.includes(colorId)) {
                return prevSelectedColors.filter((id) => id !== colorId);
            } else {
                return [...prevSelectedColors, colorId];
            }
        });
    };

    const handleStorageChange = (storageId) => {
        setSelectedStorages((prevSelectedStorages) => {
            if (prevSelectedStorages.includes(storageId)) {
                return prevSelectedStorages.filter((id) => id !== storageId);
            } else {
                return [...prevSelectedStorages, storageId];
            }
        });
    };

    const handleBrandChange = (brandId) => {
        setSelectedBrands((prevSelectedBrands) => {
            if (prevSelectedBrands.includes(brandId)) {
                return prevSelectedBrands.filter((id) => id !== brandId);
            } else {
                return [...prevSelectedBrands, brandId];
            }
        });
    };

    const handleSliderChange = (values) => {
        setSliderValue(values);
        // Xử lý giá trị range theo nhu cầu của bạn
    };

    const tipFormatter = (value) => `${value} VND`;


    const handleFilter = () => {
        const minPrice = sliderValue[0].toString();
        const maxPrice = sliderValue[1].toString();
        console.log("Giá: ", minPrice, maxPrice)
        const filterData = {
            ramIds: selectedRams.length > 0 ? selectedRams : null,
            storageIds: selectedStorages.length > 0 ? selectedStorages : null,
            brandIds: selectedBrands.length > 0 ? selectedBrands : null,
            colorIds: selectedColors.length > 0 ? selectedColors : null,
            minPrice: minPrice !== undefined ? minPrice : null,
            maxPrice: maxPrice !== undefined ? maxPrice : null,
        };

        const filteredFilterData = Object.fromEntries(
            Object.entries(filterData).filter(([_, value]) => value !== null && value.length > 0)
        );

        const queryParams = new URLSearchParams(filteredFilterData);
        const apiUrl = `/Phones/filter?${queryParams.toString()}`;

        console.log('API URL:', apiUrl);

        axiosClient.get(apiUrl)
            .then(response => {
                console.log('Filtered phones:', response.data)
                setDataFilter(response.data);
                navigate('/filter', { state: { filterData : response.data } });
            })
            .catch(error => {
                console.error('Error filtering phones:', error);
            });
    };
    function formatCurrency(value) {
        return value.toLocaleString('en-US');
    }
    // làm sạch các giá trị đã lọc

    const handleClearFilter = () => {
        setSelectedColors([]);
        setSelectedStorages([]);
        setSelectedRams([]);
        setSelectedBrands([]);
        setSliderValue([0, 60000000]);
        
    };


    return (
        <>
            <div className='container'>
                <div class="flex-w flex-c-m p-b-52">
                    <div class="flex-w flex-l-m filter-tope-group m-tb-10">
                        <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5 how-active1" data-filter="*" >
                            <Link to="Phones">All Products</Link>

                        </button>

                        <button class="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5" data-filter=".women">
                            <Link to="carts">Cart </Link>
                        </button>
                    </div>
                    <div className='row'>
                        <div class="flex-w flex-c-m m-tb-10">

                            <Accordion>

                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <div class="flex-c-m stext-106 cl6 size-104 bor4 pointer hov-btn3 trans-04 m-r-8 m-tb-4 js-show-filter">
                                            <i class="icon-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-filter-list"></i>
                                            <i class="icon-close-filter cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close dis-none"></i>
                                            Filter
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div class="filter-container">
                                            <div className='col col-overflow'>
                                                <div class="filter-section">
                                                    <strong>Colors:</strong>
                                                    <div class="filter-options">
                                                        {colors.map((color) => (
                                                            <button
                                                                key={color.id}
                                                                className={selectedColors.includes(color.id) ? 'selected' : ''}
                                                                onClick={() => handleColorChange(color.id)}
                                                            >
                                                                {selectedColors.includes(color.id) && (
                                                                    <i className="fa fa-check"></i>
                                                                )}
                                                                {color.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div class="filter-section">
                                                    <strong>Storages:</strong>
                                                    <div class="filter-options">
                                                        {storages.map((storage) => (
                                                            <button
                                                                key={storage.id}
                                                                className={selectedStorages.includes(storage.id) ? 'selected' : ''}
                                                                onClick={() => handleStorageChange(storage.id)}
                                                            >
                                                                {selectedStorages.includes(storage.id) && (
                                                                    <i className="fa fa-check"></i>
                                                                )}
                                                                {storage.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='col col-overflow'>

                                                <div class="filter-section">
                                                    <strong>Brands:</strong>
                                                    <div class="filter-options">
                                                        {brands.map((brand) => (
                                                            <button
                                                                key={brand.id}
                                                                className={selectedBrands.includes(brand.id) ? 'selected' : ''}
                                                                onClick={() => handleBrandChange(brand.id)}
                                                            >
                                                                {selectedBrands.includes(brand.id) && (
                                                                    <i className="fa fa-check"></i>
                                                                )}
                                                                {brand.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                               
                                            </div>
                                            <div className='col'>
                                                <div class="filter-section">
                                                    <strong>Ram:</strong>
                                                    <div class="filter-options">
                                                        {rams.map((ram) => (
                                                            <button
                                                                key={ram.id}
                                                                className={selectedRams.includes(ram.id) ? 'selected' : ''}
                                                                onClick={() => handleRamChange(ram.id)}
                                                            >

                                                                {selectedRams.includes(ram.id) && (
                                                                    <i className="fa fa-check"></i>
                                                                )}
                                                                {ram.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div class="filter-section">
                                                    <strong>Price Range:</strong>
                                                    <div class="price-range">
                                                        <p>{formatCurrency(sliderValue[0])} VND</p>
                                                        <Slider

                                                            min={0}
                                                            max={60000000}
                                                            step={10}
                                                            range
                                                            value={sliderValue}
                                                            onChange={handleSliderChange}
                                                            tipFormatter={tipFormatter}
                                                        />
                                                        <p>{formatCurrency(sliderValue[1])}VND</p>
                                                    </div>
                                                </div>

                                                <br></br>
                                                <button class="filter-button" onClick={handleFilter}>Lọc</button>
                                                <button className="filter-button" onClick={handleClearFilter}>Clear</button>

                                            </div>
                                            
                                        </div>


                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                       
                       
                    </div>
                   



                </div>
            </div>


        </>
    );
};

export default Filter;
