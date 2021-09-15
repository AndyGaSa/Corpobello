import { PropTypes } from 'prop-types';
import React from 'react';
import Head from 'next/head';
import styles from '../styles/Events.module.css';
import Header from '../components/Header';

export default function Events({ username }) {
  return (
    <>
      <Head>
        <title>Corpobello - Eventos</title>
        <meta name="description" content="Tu centro de estetica y peluqueria de confianza en Badalona" />
        <link rel="icon" href="https://i.ibb.co/3Ryht66/Corpobello-Logo-Corto.png" />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="keywords" content="Estetica Belleza Peluqueria Salon Masajes Masaje Spa Badalona" />

        <link rel="manifest" href="/manifest.webmanifest" />
        <link href="/static/images/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/static/images/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/static/images/apple-icon.png" />
        <meta name="theme-color" content="#417505" />
      </Head>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>VEN Y CONOCENOS</h3>
          <h2>NUESTROS EVENTOS</h2>
        </div>
        <h1>Hola estas en events</h1>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: { username: req.cookies.username || 'undefined' },
  };
}

Events.propTypes = {
  username: PropTypes.string.isRequired,
};
