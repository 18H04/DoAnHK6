// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import './header.css'
import './checkout.css';
import Layout from './Layout';
import ProductCart from './user/ProductCart';
import './cart.css';
import Login from './user/Login';
import RegisterForm from './user/Register';
import ProductListAPI from './user/ProductlistAPI';
import ResetPassword from './user/ResetPassword';
import EmailConfirmation from './user/EmailConfirmation';
import ProductDetail from './user/ProductDetail';
import Checkout from './user/CheckOut';
import PayMentMethod from './user/PayMentMethod';
import './ctsp.css';
import './like.css';
import Blogs from './user/blog';
import Sales from './user/sale';
import InfoUser from './user/InfoUser';
import WishLists from './user/WishLists';
import EditInfoUser from './user/EditInfoUser';
import PayMentConfirm from './user/PaymentConfirm';
import FilterResult from './user/FilterResult';
import ChangePassword from './user/ChangePassWord';
import SearchResult from './user/SearchResult';
import ForgotPassword from './user/FogotPassWord';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => { 
    setLoggedIn(true);
  }

const handleLogout = () => {
    setLoggedIn(false);
  }

useEffect(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    setLoggedIn(true);
  }
}, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Routes sử dụng layout */}
          <Route path="/" element={<Layout />}>
            <Route path='/Phones' element={<ProductListAPI />} />
            <Route path='/search' element={<SearchResult />} />
            <Route path='/filter' element={<FilterResult />} />
            <Route path='/detail/:id' element={<ProductDetail />} />
            <Route path='/carts' element={<ProductCart />} />
            <Route
          path="/login"
          element={<Login setLoggedIn={handleLogin} />}
        />
            <Route path ='/infouser' element={<InfoUser/>}/>
            <Route path ='/editinfo' element={<EditInfoUser/>}/>
            <Route path='/checkout' element={<Checkout />} />
            
            <Route path='/pays' element={<PayMentMethod />} />
            <Route path='/paymentconfirm' element={<PayMentConfirm />} />
            <Route path='/RegisterForm' element={<RegisterForm />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/changepassword' element={<ChangePassword/>}/>
            <Route path='/resetpassword' element={<ResetPassword />} />
            <Route path='/EmailConfirmation' element={<EmailConfirmation />} />
            <Route path='/Blogs' element={<Blogs />} />
            <Route path='/Sales' element={<Sales />} />
      

            <Route path='/WishLists' element={<WishLists />} />

          </Route>
        </Routes>
      </BrowserRouter >

    </>
  );
}

export default App;
