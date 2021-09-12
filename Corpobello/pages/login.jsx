import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';

import styles from '../styles/Login.module.css';

export default function Login() {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState('');
  const [sendClick, setClicked] = useState(1);
  const [password, setPassword] = useState('');
  const [legend, setPasswordLegend] = useState('');
  const [errorTitle, setPasswordErrorTitle] = useState(false);
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
          await axios.post('http://localhost:3000/api/userHandler', { email: mailTitle, password });
          router.push('/');
          setErrorStatus('');
        }
      } catch (error) {
        setErrorStatus(error?.response?.data?.message);
      }
    }());
  }, [sendClick]);
  return (
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

  );
}
