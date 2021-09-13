/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
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
  const email = req.cookies.email || 'holaeraerea';
  const { data } = await axios.post('http://localhost:3000/api/userHandler', { email });
  return {
    props: {
      data,
      username,
      email,
    },
  };
}
