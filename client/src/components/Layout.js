import React, { useEffect } from 'react';
import Header from '../components/Header';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../redux/actions/auth';
import GlobalStyles from '../styles/global';
import Footer from '../components/Footer';

const Layout = (props) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await props.checkAuthenticated();
        await props.load_user();
    } catch (err) {
      alert('Error connection')
    }
  }
  fetchData();
}, []);

  return (
    <div>
      <GlobalStyles />
      <Header />
      {props.children}
      <Footer />
    </div>
  )
}

export default connect(null, { checkAuthenticated, load_user })(Layout);
