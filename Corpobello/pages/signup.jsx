import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  TextField,
  Button,
} from '@material-ui/core';
import styles from '../styles/Signup.module.css';

export default function Signup() {
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

  async function checkValidation() {
    if (mailTitle.trim().length < 1) {
      await setMailErrorTitle(true);
      setMailLegend('El E-mail no puede estar vacio!');
    } else if (!validateEmail(mailTitle)) {
      await setMailErrorTitle(true);
      setMailLegend('Vaya! Parece que tu email no es valido...');
    } else {
      await setMailErrorTitle(false);
      setMailLegend('');
    }

    if (password.trim().length < 1) {
      await setPasswordErrorTitle(true);
      setPasswordLegend('La contraseña  no puede estar vacia!');
    } else {
      await setPasswordErrorTitle(false);
      setPasswordLegend('');
    }

    if (name.trim().length < 1) {
      await setNameErrorTitle(true);
      setNameLegend('El campo nombre no puede estar vacio!');
    } else {
      await setNameErrorTitle(false);
      setNameLegend('');
    }
    setClicked(sendClick + 1);
  }

  useEffect(() => {
    (async function signup() {
      try {
        if (errorTitle === false && nameErrorTitle === false && mailErrorTitle === false
         && validateEmail(mailTitle) === true) {
          await axios.post('http://localhost:3000/api/signup', {
            name,
            email: mailTitle,
            password,
          });
          router.push('/');
          setErrorStatus('');
        }
      } catch (error) {
        setErrorStatus('Ya existe un usuario con este mail...');
      }
    }());
  }, [sendClick]);
  return (
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
              autoFocus="true"
              error={nameErrorTitle}
              label="Nombre y Apellidos"
              helperText={nameLegend}
              variant="outlined"
            />
            <TextField
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

  );
}
