/* eslint-disable react/prop-types */
import React from 'react';
import Stripe from 'stripe';
import Reserves from '../components/Reserves';
import Header from '../components/Header';
import styles from '../styles/Services.module.css';

export default function ReservesPage({ username, prices }) {
  return (
    <>
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
  const stripe = new Stripe(process.env.STRIPE_RESTRICTED_KEY, {
    apiVersion: '2020-08-27',
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });
  return {
    props: { username: req.cookies.username || 'undefined', prices: prices.data },
  };
}
