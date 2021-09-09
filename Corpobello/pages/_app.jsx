/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import moment from 'moment';
import 'moment/locale/es';

import { Provider } from 'react-redux';
import configureStore from '../redux/stores';
import Header from '../components/Header';
import 'antd/dist/antd.css';
import '../styles/Global.css';

function MyApp({ Component, pageProps }) {
  moment.locale('es');
  return (
    <Provider store={configureStore()}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
