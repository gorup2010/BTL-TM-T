import { Fragment } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Sidebar from '../components/sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const AuthUserLayout = () => {
  return (
    <Fragment>
      <Header />
      <div className="grid grid-cols-8 gap-3 max-w-[1536px] mx-auto">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};

export default AuthUserLayout;