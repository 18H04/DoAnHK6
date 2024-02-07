import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import axiosClient from '../components/axiosClient';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import CheckOutItem from '../components/CheckOutItem';
const Checkout = () => {
    // const [buyNowItem, setBuyNowItem] = useState(null);
    const [image, setImage] = useState([]);
    const [totalAllPrices, setTotalAllPrices] = useState(0);
    const [allQuantity,setAllQuantity] =useState(0);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const host = "https://provinces.open-api.vn/api/";
    const api = "https://vapi.vnappmob.com/api/";
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [fullName, setFullName] = useState('');
    const [shippingPhone, setShippingPhone] = useState('');
    const [streetName, setStreetName] = useState('');
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState({ type: "", message: "" });


    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [selectedWard, setSelectedWard] = useState(null);

    const formatPrice = (price) => {
      
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    const isValidEmail = () => email.includes("@");
    const isValiPhoneRegex = (shippingPhone) => /^0[0-9]{9}$/.test(shippingPhone);

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => {
            setNotification({ type: "", message: "" });
        }, 60000);
    };

    const fetchCities = () => {
        // axios.get(`${host}?depth=1`)
       axios.get(`http://vapi.vnappmob.com/api/province`)
            .then(response => {
                setCities(response.data.results)
                console.log("City:", response.data.results); 
            })
            .catch(error => {
                console.error('Error fetching cities:', error);
            });
    };

    const fetchDistricts = (cityCode) => {
        // axios.get(`${host}p/${cityCode}?depth=2`)
           axios.get(`http://vapi.vnappmob.com/api/province/district/${cityCode}`)
            .then(response => {
                setDistricts(response.data.results);
                console.log("Quận", response.data.results);
            })
            .catch(error => {
                console.error('Error fetching districts:', error);
            });
    };

    const fetchWards = (districtCode) => {
        // axios.get(`${host}d/${districtCode}?depth=2`)
         axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtCode}`)
            .then(response => {
                setWards(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching wards:', error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/Users/user-infor');
                console.log(response.data);
                const { fullName, phoneNumber, email } = response.data;
                setFullName(fullName);
                setShippingPhone(phoneNumber);
                setEmail(email);

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        // Call fetchData when the component is created
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification({ type: "", message: "" });

        if (!isValiPhoneRegex(shippingPhone)) {
            showNotification("error", "SĐT không hợp lệ");
            return;
        }

        if (!isValidEmail()) {
            showNotification("error", "Email không hợp lệ");
            return;
        }

        // Trim the streetName to remove leading and trailing spaces
        const trimmedStreetName = streetName.trim();
        const requestData = {
            fullName,
            shippingPhone,
            shippingAddress: `${trimmedStreetName} ${selectedWard.name} ${selectedDistrict.name} ${selectedCity.name}`,
            total: totalAllPrices,
        };

        console.log("Final Request Data:", requestData);

        localStorage.setItem("ship-info", JSON.stringify(requestData));
        
   
        navigate(`/pays`);
    };
    // useEffect(() => {
    //     const buyNowItemJSON = localStorage.getItem('buyNowItem');
    //     if (buyNowItemJSON) {
    //       const parsedBuyNowItem = JSON.parse(buyNowItemJSON);
    //       setBuyNowItem(parsedBuyNowItem);
    //     }
    //   }, []);
    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
    }, [streetName, wards, districts, cities]);
    // useEffect(() => {
    //     return () => {
        
    //         localStorage.removeItem('buyNowItem');
    //     };
    // }, []);

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/Carts/getitem`);
        setCartItems(response.data);
        console.log(response.data);
        // Calculate and set totalAllPrices after updating cartItems
        const totalPrice = response.data.reduce((total, item) => {
          return total + item.quantity * item.phoneModel.price;
        }, 0);
        const totalQuantity = response.data.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
        setAllQuantity(totalQuantity);
        setTotalAllPrices(totalPrice)
        localStorage.setItem('total', JSON.stringify({
            quantity: totalQuantity,
            price: totalPrice
            }))
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
    
    return (
        <div className='bodyCheckout'>
            <div className='containerCheckout'>
                <div className='Checkout-form '>
                
                        <Form className="col  checkout-md-6">
                        <div className='col md-3'>
                            <h2 className="main-h2">Đơn hàng: </h2>
                           
                  {cartItems.map((item) => (
                    <CheckOutItem 
                      key={item.id}
                      product={item}
                    />
                  ))}
               
                        <p style={{color: "red"}}>Tổng số lượng: {allQuantity} </p>
                        <p style={{color: "red"}}>Tổng tiền: {formatPrice(totalAllPrices)}</p>
                    </div>
                        <div className='col md-3'>
                            <h2 className="main-h2">Thông Tin Khách Hàng: </h2>
                            
                                    <Form.Group className="mb-3 ">
                                        <Form.Label>Họ và tên:</Form.Label>
                                        <Form.Control
                                            className='inputCheckout'
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control
                                    className='inputCheckout'
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>


                                    {notification.type === "error" && (
                                        <p style={{ color: "red" }}>{notification.message}</p>
                                    )}

                                    <Form.Group className="mb-3">
                                        <Form.Label>Số điện thoại:</Form.Label>
                                        <Form.Control
                                    className='inputCheckout'
                                            type="text"
                                            value={shippingPhone}
                                            onChange={(e) => setShippingPhone(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    {notification.type === "error" && (
                                        <p style={{ color: "red" }}>{notification.message}</p>
                                    )}
                                
                        </div>
                               
                            <div className='col md-3'>
                                <h2 className="main-h2">Thông Tin Giao Hàng:</h2>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tên đường:</Form.Label>
                                    <Form.Control
                                    className='inputCheckout'
                                        type="text"
                                        value={streetName}
                                        onChange={(e) => setStreetName(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="cart-section-right-select">
                                    <select
                                        name=""
                                        id="city"
                                        onChange={(e) => {
                                            const selectedCityName = e.target.selectedOptions[0].text;
                                            const selectedCityCode = e.target.value;

                                            setSelectedCity({ name: selectedCityName });
                                            fetchDistricts(selectedCityCode);
                                        }}
                                    >
                                        <option value="">Tỉnh/Thành Phố</option>
                                        {cities.map((city) => (
                                            <option key={city.province_id} value={city.province_id}>
                                                {city.province_name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name=""
                                        id="district"
                                        onChange={(e) => {
                                            const selectedDistrictName = e.target.selectedOptions[0].text;
                                            const selectedDistrictCode = e.target.value;

                                            setSelectedDistrict({ name: selectedDistrictName });
                                            fetchWards(selectedDistrictCode);
                                        }}
                                    >
                                        <option value="">Quận/huyện</option>
                                        {districts.map((district) => (
                                            <option key={district.district_id} value={district.district_id}>
                                                {district.district_name}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        name=""
                                        id="ward"
                                        onChange={(e) => {
                                            const selectedWardName = e.target.selectedOptions[0].text;
                                            const selectedWardCode = e.target.value;

                                            setSelectedWard({ name: selectedWardName });
                                        }}
                                    >
                                        <option value="">Phường/xã</option>
                                        {wards.map((ward) => (
                                            <option key={ward.ward_id} value={ward.ward_id}>
                                                {ward.ward_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Button className='buttonCheckout' type="submit" variant="success" onClick={handleSubmit}>
                                    Tiếp tục
                                </Button>
                               </div>

                            </Form>
                        
                        
                   </div>
                </div>
            </div>
                    
               
        
    );
}
export default Checkout; 