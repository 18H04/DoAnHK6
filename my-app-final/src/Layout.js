import { Outlet } from "react-router-dom";
import Header from "./user/Header";
import Slideshow from "./user/Slideshow";
import Filter from "./components/Filter";
import Footer from "./user/Footer";
import "./header.css";
import QC from "./user/QC";



const Layout = () => {
    return (
        <>
            <Header />
            <Slideshow/>
            <Filter/>
            <Outlet />
            <Footer />

        </>
    );
};

export default Layout;