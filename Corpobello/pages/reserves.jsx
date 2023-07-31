import React from 'react';
import Stripe from 'stripe';
import { PropTypes } from 'prop-types';
import Head from 'next/head';
import Reserves from '../components/Reserves';
import Header from '../components/Header';
import styles from '../styles/Services.module.css';

export default function ReservesPage({ username, prices }) {
  return (
    <>
      <Head>
        <title>Corpobello -Reservas</title>
        <meta
          name="description"
          content="Tu centro de estetica y peluqueria de confianza en Badalona"
        />
        <link
          rel="icon"
          href="https://i.ibb.co/3Ryht66/Corpobello-Logo-Corto.png"
        />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="keywords"
          content="Estetica Belleza Peluqueria Salon Masajes Masaje Spa Badalona"
        />

        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content="#417505" />
      </Head>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>CORPOBELLO</h3>
          <h2>TE ESTAMOS ESPERANDO</h2>
        </div>
        <Reserves prices={prices} />
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_RESTRICTED_KEY, {
    apiVersion: '2020-08-27',
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });
  return {
    props: {
      username: req.cookies.username || 'undefined',
      prices: prices.data,
    },
  };
}

ReservesPage.propTypes = {
  username: PropTypes.string.isRequired,
  prices: PropTypes.objectOf(PropTypes.string).isRequired,
};
