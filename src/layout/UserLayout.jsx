import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

const UserLayout = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default UserLayout;