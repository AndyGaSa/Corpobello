import { PropTypes } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import Head from 'next/head';
import Header from '../components/Header';
import styles from '../styles/Login.module.css';

export default function Login({ username }) {
  <script src="dist/notiflix-aio-3.0.2.min.js" />;
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState('');
  const [sendClick, setClicked] = useState(1);
  const [password, setPassword] = useState('');
  const [legend, setPasswordLegend] = useState('');
  const [errorTitle, setPasswordErrorTitle] = useState(false);
  const [mailTitle, setMailTitle] = useState('');
  const [mailLegend, setMailLegend] = useState('');
  const [mailErrorTitle, setMailErrorTitle] = useState(false);
  useEffect(() => {
    if (router.query.redirect) {
      Notiflix.Report.info('Hola!', 'Parece que has intentado acceder a la pagina perfil sin estar logeado.\n\rLogeate primero para poder acceder a tu perfil!', 'Entendido');
    }
  }, []);
  function validateEmail(email) {
    const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailRegexp.test(email);
  }
  function checkValidation() {
    if (mailTitle.trim().length < 1) {
      setMailErrorTitle(true);
      setMailLegend('Email can\'t be empty');
    } else if (!validateEmail(mailTitle)) {
      setMailErrorTitle(true);
      setMailLegend('Email not valid');
    } else {
      setMailErrorTitle(false);
      setMailLegend('');
    }

    if (password.trim().length < 1) {
      setPasswordErrorTitle(true);
      setPasswordLegend('Password can\'t be empty');
    } else {
      setPasswordErrorTitle(false);
      setPasswordLegend('');
    }
    setClicked(sendClick + 1);
  }
  useEffect(() => {
    (async function LoginWithApi() {
      try {
        if (errorTitle === false && mailErrorTitle === false
         && validateEmail(mailTitle) === true) {
          await axios.post('http://localhost:3000/api/userHandler', { email: mailTitle?.toLowerCase(), password });
          router.push('/');
          setErrorStatus('');
        }
      } catch (error) {
        setErrorStatus(error?.response?.data?.message);
      }
    }());
  }, [sendClick]);
  return (
    <>
      <Head>
        <title>Corpobello - Login</title>
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
      <main className={styles.mainContainer}>
        <div className={styles.bgDiv}>
          <section className={styles.loginContainer}>
            <h1>
              Hola,
              <br />
              Bienvenido de nuevo!
            </h1>
            <form className={styles.form}>
              <TextField
                autoComplete="current-password"
                className={styles.loginInput}
                onChange={(event) => {
                  setMailTitle(event.target.value);
                  if (mailTitle.length > 24) {
                    setMailErrorTitle(true);
                    setMailLegend('Can\'t be longer than 24 characters');
                  } else {
                    setMailErrorTitle(false);
                    setMailLegend('');
                  }
                }}
                autoFocus
                error={mailErrorTitle}
                label="E-mail"
                helperText={mailLegend}
                variant="outlined"
              />
              <TextField
                autoComplete="current-password"
                className={styles.loginInput}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (password.length > 20) {
                    setPasswordErrorTitle(true);
                    setPasswordLegend('Can\'t be longer than 20 characters');
                  } else {
                    setPasswordErrorTitle(false);
                    setPasswordLegend('');
                  }
                }}
                error={errorTitle}
                label="Contraseña"
                type="password"
                helperText={legend}
                variant="outlined"
              />
              <Button variant="contained" onClick={() => checkValidation()} color="secondary">
                Login
              </Button>
              <p className={styles.errorMessage}>{errorStatus}</p>
            </form>
            <span>
              No tienes una cuenta?
              <a href="/signup">  Registrate</a>
            </span>
          </section>
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

Login.propTypes = {
  username: PropTypes.string.isRequired,
};
