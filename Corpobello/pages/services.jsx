/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/Services.module.css';

export default function Services({ username }) {
  return (
    <>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>DESCUBRE</h3>
          <h2>NUESTROS SERVICIOS</h2>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: { username: req.cookies.username || 'undefined' },
  };
}
