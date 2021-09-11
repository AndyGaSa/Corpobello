import React, { useState } from 'react';
import {
  TextField,
  Button,
} from '@material-ui/core';

import styles from '../styles/Login.module.css';

export default function Login() {
  const [userTitle, setUserTitle] = useState('');
  const [legend, setLegend] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
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

    if (userTitle.trim().length < 1) {
      setErrorTitle(true);
      setLegend('Username can\'t be empty');
    } else {
      setErrorTitle(false);
      setLegend('');
    }
  }
  return (
    <main className={styles.mainContainer}>
      <section className={styles.loginContainer}>
        <h1>REGISTRATE</h1>
        <form className={styles.UserForm__UserMail}>
          <TextField
            onChange={(event) => {
              setUserTitle(event.target.value);
              if (userTitle.length > 12) {
                setErrorTitle(true);
                setLegend('Can\'t be longer than 12 characters');
              } else {
                setErrorTitle(false);
                setLegend('');
              }
            }}
            error={errorTitle}
            label="Nombre"
            helperText={legend}
            variant="outlined"
          />
          <TextField
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
            error={mailErrorTitle}
            label="E-mail"
            helperText={mailLegend}
            variant="outlined"
          />
          <Button variant="contained" onClick={checkValidation} color="primary">
            Login
          </Button>
        </form>
      </section>
    </main>

  );
}
