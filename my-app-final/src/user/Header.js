import React, { useEffect, useRef, useState } from 'react';
import QC from "./QC";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { jwtDecode } from 'jwt-decode';
import { faPowerOff,faIdCard, faUser} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = ({ onLogout }) => {
	const navigate = useNavigate();
	const [userName, setUserName] = useState(null);
	const [logoutVisible, setLogoutVisible] = useState(false);
	const handleLogout = () => {
		localStorage.removeItem('jwt');
		setUserName(null);
		if (typeof onLogout === 'function') {
		  onLogout();
		}
		navigate('/login');
	  };
	
	  const showAlert = () => {
			swal({
				title: "Xin Chào Quý Khách !",
				text: "Hiện tại tổng đài đang bận, xin quý khách vui lòng gọi lại sau, xin cảm ơn quý khách đã liên hệ!",
				icon: 'info', // Có thể là 'success', 'error', 'warning', 'info', 'question'
			});
		};
		useEffect(() => {
			const handleClickOutside = (event) => {
			  if (logoutVisible && !event.target.closest('.user-container')) {
				setLogoutVisible(false);
			  }
			};
	  
			document.addEventListener('click', handleClickOutside);
	  
			return () => {
			  document.removeEventListener('click', handleClickOutside);
			};
		  }, [logoutVisible]);
		useEffect(() => {
			const token = localStorage.getItem('jwt');
		  
			if (token) {
			  try {
				const decodedUserInfo = jwtDecode(token);
				const userName = decodedUserInfo['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
		  
				if (userName) {
				  setUserName(userName);
				} else {
				  console.error('User Name not found in decoded user info.');
				}
			  } catch (error) {
				console.error('Error decoding token:', error);
			  }
			}
		  }, []);

		  useEffect(() => {
			const handleClickOutside = (event) => {
			  if (logoutVisible && !event.target.closest('.user-container')) {
				setLogoutVisible(false);
			  }
			};
	  
			document.addEventListener('click', handleClickOutside);
	  
			return () => {
			  document.removeEventListener('click', handleClickOutside);
			};
		  }, [logoutVisible]);
		  
  const handleUserNameClick = () => {
    setLogoutVisible(!logoutVisible);
  };
		return (

			<>
				<div>
					<header class="header trans_300">

						<div class="topnav">
							<div class="container">
								<div class="row">
									<QC />

								</div>
								<div className="row">
									<div class="containerSearch">

										<div class="section1"><SearchBar /></div>
										
										<div class="section3">
											<button onClick={showAlert}>
												<i class="fas fa-phone-volume contact"> </i>113</button>
										</div>
										<div class="section4"><Link to="Blogs"><i class="far fa-newspaper"></i><br />Blogs</Link></div>
										<div class="section5"><Link to="WishLists" > <i class="fa fa-heart" aria-hidden="true"></i>Yêu Thích
											
										</Link></div>
										<div class="section6"><Link to="RegisterForm" > <i class="fa fa-user-plus" aria-hidden="true"></i>Đăng Ký</Link></div>
										{userName ? (
  <div className={`user-container ${logoutVisible ? 'logout-visible' : ''}`} onClick={handleUserNameClick}>   
    <div className="avatar"></div>  
    <h2 className="user-name">{userName}</h2>
	{logoutVisible && (
      <div id="logout-sidebar">
        <a className="dropdown-item" onClick={handleLogout}>
          <i className="dropdown-item-icon mdi mdi-power text-black me-2">
            <FontAwesomeIcon icon={faPowerOff} />
          </i> <span style={{color:"black"}}>Đăng xuất</span>
        </a>
        {/* <a className="dropdown-item" href="/infouser">
          <i className="dropdown-item-icon mdi mdi-power text-black me-2">
		  <FontAwesomeIcon icon={faIdCard} />
          </i> <span style={{color:"black"}}>Thông tin tài khoản</span>
        </a> */}
      </div>
    )}
  </div>
) : (
	
  <Link to="/login"><FontAwesomeIcon icon={faUser}/>Đăng nhập</Link>
)}


										<div class="section">
											<Link to="carts"><i class="fas fa-cart-arrow-down cartclass" ></i><br /></Link>

										</div>
									</div>
								</div>

							</div>
						</div>

						{/* <div class="main_nav_container">
							<div class="container">
								<div class="row">
									
									<div class="col">
										<div class="logo_container">
											<div className="container">
												<div className="row">
													<div className="col d-flex">
														<img className="banana" src="asset/images/mr.chuoi.jpg" alt="Slide 1" />
														<span className="logoText">Banana</span>

													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="col text-right ">
										<nav class="menu-container">
											<ul class="navbar_menu">
												<li><Link to="Sales">Thông Tin Khuyến Mãi</Link></li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</div> */}

					</header>



				</div>
			</>
		);
	}

export default Header;