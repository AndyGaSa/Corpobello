/* eslint-disable react/prop-types */
import React from 'react';
import styles from '../styles/Events.module.css';
import Header from '../components/Header';

export default function Events({ username }) {
  return (
    <>
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
