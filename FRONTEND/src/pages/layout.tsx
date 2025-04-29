import React from 'react';
import Navbar from '../componants/navbar';
import Footer from '../componants/footer';
import { Outlet } from 'react-router-dom';
import FloatingChatButton from '../componants/chatBot/FloatingChatButton';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <FloatingChatButton />
      <Footer />
    </>
  );
};

export default Layout;
