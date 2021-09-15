import { PropTypes } from 'prop-types';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import Header from '../components/Header';
import styles from '../styles/Signup.module.css';

export default function Signup({ username }) {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState('');
  const [sendClick, setClicked] = useState(1);
  const [password, setPassword] = useState('');
  const [legend, setPasswordLegend] = useState('');
  const [errorTitle, setPasswordErrorTitle] = useState(false);
  const [name, setName] = useState('');
  const [nameLegend, setNameLegend] = useState('');
  const [nameErrorTitle, setNameErrorTitle] = useState(false);
  const [mailTitle, setMailTitle] = useState('');
  const [mailLegend, setMailLegend] = useState('');
  const [mailErrorTitle, setMailErrorTitle] = useState(false);

  function validateEmail(email) {
    const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailRegexp.test(email);
  }

  function checkValidation() {
    if (mailTitle.trim().length < 1) {
      setMailErrorTitle(true);
      setMailLegend('El E-mail no puede estar vacio!');
    } else if (!validateEmail(mailTitle)) {
      setMailErrorTitle(true);
      setMailLegend('Vaya! Parece que tu email no es valido...');
    } else {
      setMailErrorTitle(false);
      setMailLegend('');
    }

    if (password.trim().length < 1) {
      setPasswordErrorTitle(true);
      setPasswordLegend('La contraseña  no puede estar vacia!');
    } else {
      setPasswordErrorTitle(false);
      setPasswordLegend('');
    }

    if (name.trim().length < 1) {
      setNameErrorTitle(true);
      setNameLegend('El campo nombre no puede estar vacio!');
    } else {
      setNameErrorTitle(false);
      setNameLegend('');
    }
    setClicked(sendClick + 1);
  }

  useEffect(() => {
    (async function signupAndLogin() {
      try {
        if (errorTitle === false && nameErrorTitle === false && mailErrorTitle === false
         && validateEmail(mailTitle) === true) {
          await axios.post('http://localhost:3000/api/signup', {
            name,
            email: mailTitle.toLowerCase(),
            password,
          });
          await axios.post('http://localhost:3000/api/userHandler', { email: mailTitle.toLowerCase(), password });
          router.push('/');
          setErrorStatus('');
        }
      } catch (error) {
        setErrorStatus('Ya existe un usuario con este mail...');
      }
    }());
  }, [sendClick]);
  return (
    <>
      <Head>
        <title>Corpobello - Signup</title>
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
              Bienvenid@
              <br />
              Registrate y unete!
            </h1>
            <form className={styles.form}>
              <TextField
                autoComplete="current-password"
                className={styles.loginInput}
                onChange={(event) => {
                  setName(event.target.value);
                  if (name.length > 24) {
                    setNameErrorTitle(true);
                    setNameLegend('El campo nombre no puede ser mas largo de 24 letras...');
                  } else {
                    setNameErrorTitle(false);
                    setNameLegend('');
                  }
                }}
                autoFocus
                error={nameErrorTitle}
                label="Nombre y Apellidos"
                helperText={nameLegend}
                variant="outlined"
              />
              <TextField
                autoComplete="current-password"
                className={styles.loginInput}
                onChange={(event) => {
                  setMailTitle(event.target.value);
                  if (mailTitle.length > 50) {
                    setMailErrorTitle(true);
                    setMailLegend('El campo e-mail no puede ser mas largo de 50 caracteres!');
                  } else {
                    setMailErrorTitle(false);
                    setMailLegend('');
                  }
                }}
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
                  if (password.length > 30) {
                    setPasswordErrorTitle(true);
                    setPasswordLegend('La contraseña no puede ser mas larga de 30 caracteres!');
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
              <Button variant="contained" onClick={() => checkValidation()}>
                estoy list@
              </Button>
              <p className={styles.errorMessage}>{errorStatus}</p>
            </form>
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

Signup.propTypes = {
  username: PropTypes.string.isRequired,
};
