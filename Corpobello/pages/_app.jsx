/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ConfigProvider } from 'antd';
import esES from 'antd/lib/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';

import Header from '../components/Header';
import 'antd/dist/antd.css';
import '../styles/Global.css';

function MyApp({ Component, pageProps }) {
  moment.locale('es');
  return (
    <ConfigProvider locale={esES}>
      <Header />
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
