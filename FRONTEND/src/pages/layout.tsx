import React from 'react';
import Navbar from '../componants/navbar';
import Footer from '../componants/footer';
import { Outlet } from 'react-router-dom';
import ChatBot from '../componants/chatBot/chatBot';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <ChatBot></ChatBot>
      <Footer />
    </>
  );
};

export default Layout;
