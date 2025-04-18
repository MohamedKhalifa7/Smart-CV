import React from 'react';
import Navbar from '../componants/navbar';
import Footer from '../componants/footer';
import { Outlet } from 'react-router-dom';
import Builder from '../componants/Builder/Buldir';

const Layout = () => {
    return (
        <>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}

export default Layout;
