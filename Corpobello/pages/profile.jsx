/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../components/Header';
import UserAvatar from '../components/UserAvatar';
import UserForm from '../components/UserForm';
import styles from '../styles/Profile.module.css';

export default function Profile({ username }) {
  return (
    <>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>CORPOBELLO</h3>
          <h2>BIENVENIDO A TU PERFIL</h2>
        </div>
        <section className={styles.UserContainer}>
          <div className={styles.UserInfoContainer}>
            <div className={styles.PortraitImg}>
              <UserAvatar />
            </div>
            <UserForm className={styles.UserForm} />
          </div>
          <div className={styles.reservesContainer}>
            <h2>aquivan las reservas</h2>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: { username: req.cookies.username || 'undefined' },
  };
}
