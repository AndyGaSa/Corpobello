/* eslint-disable react/prop-types */
import React from 'react';
import Reserves from '../components/Reserves';
import Header from '../components/Header';
import styles from '../styles/Services.module.css';

export default function ReservesPage({ username }) {
  return (
    <>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>CORPOBELLO</h3>
          <h2>TE ESTAMOS ESPERANDO</h2>
        </div>
        <Reserves />
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: { username: req.cookies.username || 'undefined' },
  };
}
