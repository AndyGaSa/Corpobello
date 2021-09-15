import React, { useEffect } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '../components/Header';
import UserForm from '../components/UserForm';
import styles from '../styles/Profile.module.css';

export default function Profile({ username, data }) {
  const router = useRouter();
  useEffect(() => {
    if (username === 'undefined') {
      router?.push({
        pathname: '/login',
        query: { redirect: true },
      });
    }
  }, []);
  return (
    <>
      <Head>
        <title>Corpobello - Perfil</title>
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
        <section className={styles.UserContainer}>
          <div className={styles.UserInfoContainer}>
            <div />
            <UserForm user={data} className={styles.UserForm} />
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const username = req.cookies.username || 'undefined';
  const email = req.cookies.email || 'undefined';
  const { data } = await axios.post('http://localhost:3000/api/userHandler', { email });
  return {
    props: {
      data,
      username,
    },
  };
}

Profile.propTypes = {
  username: PropTypes.string.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
