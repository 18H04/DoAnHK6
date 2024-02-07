import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../components/axiosClient';
import SlideshowDetail from '../components/SlideShowDetail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';


const ProductDetail = () => {

    const navigate = useNavigate();
    const { id: PhoneId } = useParams();

    const [colors, setColors] = useState([]);
    const [storages, setStorages] = useState([]);
    const [selectedColorId, setSelectedColorId] = useState(null);
    const [selectedStorageId, setSelectedStorageId] = useState(null);
    const [filteredPhoneData, setFilteredPhoneData] = useState([]);
    const [phoneModels, setPhoneModels] = useState([]);
    const [cart, setCartItems] = useState([]);
    const [selectedPhonePrice, setSelectedPhonePrice] = useState(null); 
    const [selectedImageName, setSelectedImageName] = useState('');
    const formatPrice = (price) => {
        // Assuming price is a number, you can customize the formatting as needed
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("id: ", PhoneId);
                const response = await axiosClient.get(`/PhoneModels/GetPhoneModelsbyPhoneId?phoneId=${PhoneId}`);
                setPhoneModels(response.data);

                response.data.forEach(phoneModel => {
                    if (phoneModel.color && phoneModel.color.name) {
                        const colorId = phoneModel.color.id;
                        const colorName = phoneModel.color.name;

                        setColors(prevColors => {
                            if (!prevColors.some(color => color.id === colorId)) {
                                return [...prevColors, { id: colorId, name: colorName }];
                            }
                            return prevColors;
                        });
                    }

                    if (phoneModel.storage && phoneModel.storage.name) {
                        const storageId = phoneModel.storage.id;
                        const storageName = phoneModel.storage.name;

                        setStorages(prevStorages => {
                            if (!prevStorages.some(storage => storage.id === storageId)) {
                                return [...prevStorages, { id: storageId, name: storageName }];
                            }
                            return prevStorages;
                        });
                    }
                });
                console.log("Data: ", phoneModels);
                console.log("Updated Colors:", colors);
                console.log("Updated Storages:", storages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [PhoneId, colors, storages]);

    useEffect(() => {
        const filteredModels = phoneModels.filter(phoneModel =>
            phoneModel.color.id === selectedColorId &&
            phoneModel.storage.id === selectedStorageId
        );

        setFilteredPhoneData(filteredModels);
        console.log("Lọc: ", filteredPhoneData);

        // Update the selected phone price when filtered models change
        if (filteredModels.length > 0) {
            setSelectedPhonePrice(filteredModels[0].price);
        } else {
            setSelectedPhonePrice(null);
        }
    }, [selectedColorId, selectedStorageId, phoneModels]);

    const handleColorClick = (colorId) => {
        setSelectedColorId((prevColorId) => (prevColorId === colorId ? null : colorId));
    };

    const handleStorageClick = (storageId) => {
        setSelectedStorageId((prevStorageId) => (prevStorageId === storageId ? null : storageId));
    };

    const handleBuyNow = () => {
        const selectedPhoneModel = filteredPhoneData[0]; // Assuming there is only one selected phone model
        console.log("Dữ liệu lọc: ", selectedPhoneModel.id);
        const postData = {
            phoneModelId: filteredPhoneData[0].id,
        };
        if (selectedPhoneModel) {

            console.log("Gửi", postData);
            axiosClient.post('/Carts/additem', postData)
            const {
                id,
                price,
                phone : {name},
                color: { id: selectedColorID, name: colorName },
                storage: { id: selectedStorageID, name: storageName },
            } = selectedPhoneModel;
            // localStorage.setItem('total', JSON.stringify({
            //     price: selectedPhoneModel.price
            // }))
            // localStorage.setItem('buyNowItem', JSON.stringify({
            //     name,
            //     price,
            //     colorName,
            //     storageName,
            //     phonemodelId: id,
            //     image: selectedImageName,
            // }));
            // Update the selected phone price in the component state
            setSelectedPhonePrice(price);
            setTimeout(function() {
                navigate('/checkout');
            }, 2000);
        }
    };

    const handleAddCart = () => {
        const postData = {
            phoneModelId: filteredPhoneData[0].id,
        };
        console.log("Gửi", postData);
        axiosClient.post('/Carts/additem', postData)
            .then(response => {
                console.log('Dữ liệu đã được POST thành công:', response.data);
                swal(
                    "Thành Công",
                    "Thêm vào giỏ hàng thành công!",
                    "success"
                );
                setCartItems([...cart, response.data]);
            })
            .catch(error => {
                console.error('Lỗi khi POST dữ liệu:', error);
            });
    };
    
    const username = localStorage.getItem('username');
    const [isFavorite, setIsFavorite] = useState(false);

    const addFavorite = async () => {

        const response = await axiosClient.post(`Wishlists/CheckExists?username=${username}&productId=${PhoneId}`)
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
                .post(`Wishlists/addFavorite?username=${username}&productId=${PhoneId}`)
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
        <div >
            <div className='containerDetail'>
                <div className='row'>
                    <div className='col md-8'>
                        <SlideshowDetail id={PhoneId} colorId={selectedColorId}    onImageNameChange={setSelectedImageName} />

                        <div className='containerPr'>
                            <p className='p1'> Các Thông Tin Liên Quan Về Apple:</p>
                            <p className='p2'>
                                <p className='special-info '>Sản Phẩm Nổi Tiếng:</p>

                                <p className='specialPhone '>iPhone:</p> Dòng điện thoại thông minh đình đám trên toàn cầu, nổi tiếng với thiết kế đẹp, hệ điều hành iOS và nhiều tính năng tiên tiến.

                                <p className='specialPhone '>iPad: </p>Máy tính bảng với nhiều kích thước và mục đích sử dụng, từ giáo dục đến công việc sáng tạo.

                                <p className='specialPhone '> Mac:</p> Dòng máy tính cá nhân và máy tính xách tay với hệ điều hành macOS, được biết đến với hiệu suất và thiết kế đẳng cấp.

                                <p className='specialPhone '>Apple Watch:</p>  Đồng hồ thông minh với nhiều tính năng theo dõi sức khỏe và hoạt động.

                                <p className='specialPhone '>AirPods:</p> Tai nghe không dây được tích hợp công nghệ không dây tiên tiến.
                            </p>
                            <p className='p3'>
                                <p className='special-info '>Hệ Điều Hành:</p>
                                Apple sử dụng hệ điều hành đóng của mình là iOS cho iPhone và iPad, macOS cho máy tính cá nhân Mac, watchOS cho Apple Watch, và tvOS cho Apple TV.
                            </p>
                            <p className='p4'>
                                <p className='special-info '>Đổi Mới và Thiết Kế:</p>
                                Apple nổi tiếng với việc đưa ra các sản phẩm và giải pháp công nghệ sáng tạo, thường xuyên thay đổi cách người dùng tương tác và sử dụng công nghệ.
                            </p>
                            <p className='p4'>
                                <p className='special-info '>Ổn Định và Hệ Sinh Thái:</p>Apple tạo ra một hệ sinh thái tích hợp giữa các sản phẩm và dịch vụ của mình, cho phép người dùng trải nghiệm mượt mà qua nhiều thiết bị khác nhau.
                            </p>
                            <p className='p5'>
                                <p className='special-info '>Dịch Vụ:</p>
                                Ngoài sản phẩm phần cứng, Apple cũng cung cấp nhiều dịch vụ như Apple Music, Apple TV+, Apple Arcade và iCloud.

                                <p className='special '>Bảo Mật và Quyền Riêng Tư:</p>
                                Apple nổi tiếng với cam kết mạnh mẽ đối với bảo mật thông tin cá nhân và quyền riêng tư của người dùng.

                                <p className='special'>Thương Hiệu Mạnh Mẽ:</p>
                                Thương hiệu Apple không chỉ là về sản phẩm, mà còn là về cách mà công ty tạo ra sự kết nối mạnh mẽ với người dùng thông qua quảng cáo, sự kiện và trải nghiệm người dùng.</p>

                        </div>
                    </div>

                    <div className='col-4'>
                        {/* chọn màu */}
                        <div className="color-container">
                            {colors.map(color => (
                                <button
                                    key={color.id}
                                    className={`color-button ${selectedColorId === color.id ? 'selected' : ''}`}
                                    onClick={() => handleColorClick(color.id)}
                                >
                                    {color.name}
                                </button>
                            ))}
                        </div>
                        {/* chọn dung lượng */}
                        <div className='storage'>
                            {storages.map(storage => (
                                <button
                                    key={storage.id}
                                    className={`storage-button ${selectedStorageId === storage.id ? 'selected' : ''}`}
                                    onClick={() => handleStorageClick(storage.id)}
                                >
                                    {storage.name}
                                </button>
                            ))}
                        </div>
                        <div>
                {filteredPhoneData.map(phoneModel => (
                    <div key={phoneModel.id}>
                        <h4 style={{ color: "red" }}>{formatPrice(phoneModel.price)} </h4>
                    </div>
                ))}
            </div>

                        <div className='row buttonAccept'>
                            <div className='col md-6 '>
                                <button className='pay' onClick={() => handleBuyNow()}>
                                    Mua ngay
                                    <br />
                                    <p className='ghtn'>
                                        Giao Hàng Tận Nơi
                                    </p>
                                </button>
                            </div>
                            <div className='col md-6 '>
                                <button className='pay' onClick={() => handleAddCart()}>
                                   Thêm vào giỏ hàng
                                    <br />

                                </button>
                            </div>
                            <div className='col md-6'>
                                {/* <button class="favorite-button" onClick={() => handleBuyNow()}>
                                    <i class="fas fa-heart"></i>
                                    <div class="falling-heart"></div>
                                </button> */}
                                <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={addFavorite} title='Thêm yêu thích'>
                                    <i>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </i>
                                    {isFavorite ? ' ' : ' '}
                                </button>
                            </div>
                        </div>



                        <div className="containerInfor">
                            {filteredPhoneData.map(phoneModel => (
                                <div key={phoneModel.id}>
                                    <p><i class="fa-solid fa-circle-info"></i> Kích thước màn hình: {phoneModel.screenSize} inch</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Dung lượng pin: {phoneModel.batteryCapacity} MaH</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Độ phân giải camera: {phoneModel.cameraResolution} MP</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Cổng kết nối: {phoneModel.chargingPort}</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Hệ điều hành: {phoneModel.os}</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Chip: {phoneModel.cpu}</p>
                                    <p><i class="fa-solid fa-circle-info"></i> Ram: {phoneModel.ram.name} GB</p>
                                </div>
                            ))}
                        </div>

                        <div class="additional-offers-container">
                            <h2 className='sale'><i class="fas fa-gift"> </i> KHUYẾN MÃI</h2>
                            <ul>
                                <li>Giảm thêm tới 1% cho thành viên Smember (áp dụng tùy sản phẩm)</li>
                                <li>Giảm thêm 2% tối đa 800.000đ khi thanh toán qua Momo</li>
                                <li>Giảm đến 400k cho đơn hàng từ 50 triệu</li>
                                <li>Trả góp lãi suất 0% qua công ty tài chính trên giá khuyến mãi (kỳ hạn 4-6-8) tháng </li>
                                <li>B2B - Ưu đãi tốt hơn cho khách hàng doanh nghiệp, trường học,... khi mua số lượng nhiều</li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetail;
