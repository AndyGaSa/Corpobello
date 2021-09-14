import { PropTypes } from 'prop-types';
import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  FormHelperText,
  TextField,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Avatar, IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import styles from '../styles/UserForm.module.css';

export default function UserForm({ user }) {
  const router = useRouter();
  const [userTitle, setUserTitle] = useState(user?.name);
  const [legend, setLegend] = useState('');
  const [sendClick, setClicked] = useState(1);
  const [errorTitle, setErrorTitle] = useState(false);
  const [mailTitle, setMailTitle] = useState(user?.email);
  const [mailLegend, setMailLegend] = useState('');
  const [mailErrorTitle, setMailErrorTitle] = useState(false);
  const [RadioValue, setRadioValue] = React.useState('');
  const [RadioErrorText, setRadioErrorText] = React.useState('');
  const [RadioError, setRadioError] = React.useState(false);
  const [profileImg, setImg] = useState(user?.image);
  const [description, setDescription] = useState(user?.description);
  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  }

  const descriptionPlaceholder = user && user?.description?.length > 0 ? user?.description : 'Comentanos aqui lo que necesites!';
  const RadioHandleChange = (event) => {
    setRadioValue(event.target.value);
    if (event.target.value.length < 1) {
      setRadioErrorText('Necesitamos que rellenes este campo');
      setRadioError(true);
    } else {
      setRadioErrorText('');
      setRadioError(false);
    }
  };
  function validateEmail(email) {
    const mailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return mailRegexp.test(email);
  }
  function checkValidation() {
    if (mailTitle.trim().length < 1) {
      setMailErrorTitle(true);
      setMailLegend('El campo email no puede estar vacio');
    } else if (!validateEmail(mailTitle)) {
      setMailErrorTitle(true);
      setMailLegend('Parece que el email que has introducido no es valido...');
    } else {
      setMailErrorTitle(false);
      setMailLegend('');
    }

    if (userTitle.trim().length < 1) {
      setErrorTitle(true);
      setLegend('El campo nombre no puede estar vacio');
    } else {
      setErrorTitle(false);
      setLegend('');
    }

    if (RadioValue.length < 1) {
      setRadioErrorText('El campo genero es obligatorio');
      setRadioError(true);
    } else {
      setRadioErrorText('');
      setRadioError(false);
    }

    setClicked(sendClick + 1);
  }
  async function logout() {
    try {
      await axios.get('http://localhost:3000/api/logout');
      router.push('/');
    } catch (error) {
      Notiflix.Report.failure('Error!', { error }, 'Ok');
    }
  }
  useEffect(() => {
    (async function signupAndLogin() {
      try {
        if (errorTitle === false && mailErrorTitle === false
         && validateEmail(mailTitle) === true && sendClick > 1) {
          await axios.put('http://localhost:3000/api/userHandler', {
            name: userTitle,
            email: mailTitle.toLowerCase(),
            gender: RadioValue,
            image: profileImg,
            description,
          });
          Notiflix.Report.success('Guardado!', 'Se han guardado tus cambios con exito!', 'Ok');
        }
      } catch (error) {
        Notiflix.Report.failure('Error!', { error }, 'Ok');
      }
    }());
  }, [sendClick]);
  return (
    <>
      <div className={styles.PortraitImg}>
        <div className="UserAvatarDiv">
          <Avatar alt="Jhon Snow" src={profileImg} className={styles.UserAvatarImg} />
          <div />
          <label htmlFor="icon-button-file" className={styles.editIconDiv}>
            <input accept="image/*" className={styles.inputUpload} onChange={onImageChange} id="icon-button-file" type="file" />
            <IconButton aria-label="upload picture" className={styles.iconButton} component="span">
              <EditIcon style={{ color: 'white' }} />
            </IconButton>
          </label>
        </div>
      </div>
      <form className={styles.UserForm} data-testid="userForm">
        <div className={styles.UserForm__UserMail}>
          <TextField
            className={styles.formInputs}
            onChange={(event) => {
              setUserTitle(event.target.value);
              if (userTitle.length > 30) {
                setErrorTitle(true);
                setLegend('El campo nombre no puede ser mas grande de 30 caracteres');
              } else {
                setErrorTitle(false);
                setLegend('');
              }
            }}
            error={errorTitle}
            value={userTitle}
            label="Nombre y Apellidos"
            helperText={legend}
            variant="outlined"
          />
          <TextField
            className={styles.formInputs}
            onChange={(event) => {
              setMailTitle(event.target.value);
              if (mailTitle.length > 30) {
                setMailErrorTitle(true);
                setMailLegend('El campo email no puede ser mas largo de 30 caracteres');
              } else {
                setMailErrorTitle(false);
                setMailLegend('');
              }
            }}
            value={mailTitle}
            error={mailErrorTitle}
            label="Email"
            helperText={mailLegend}
            variant="outlined"
          />
        </div>
        <FormControl component="fieldset" error={RadioError}>
          <FormLabel id={styles.RadioFormLabel} component="legend">Genero</FormLabel>
          <RadioGroup aria-label="gender" id={styles.radioButtons} name="gender1" value={RadioValue} onChange={RadioHandleChange}>
            <FormControlLabel className={styles.radioValues} value="female" control={<Radio />} label="Mujer" />
            <FormControlLabel className={styles.radioValues} value="male" control={<Radio />} label="Hombre" />
            <FormControlLabel className={styles.radioValues} value="unknown" control={<Radio />} label="Prefiero no decirlo" />
            <FormHelperText>{RadioErrorText}</FormHelperText>
          </RadioGroup>
        </FormControl>
        <div>
          <div htmlFor="Bio" className={styles.BioForm}>
            <span>Descripción - Comentarios</span>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder={descriptionPlaceholder}
              className={styles.TextArea}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <Button className={styles.formButton} variant="contained" onClick={() => checkValidation()} data-testid="saveButton">
          GUARDAR CAMBIOS
        </Button>
        <Button className={styles.logoutButton} variant="contained" onClick={() => logout()} data-testid="saveButton">
          CERRAR SESIÓN
        </Button>
      </form>
    </>

  );
}

UserForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
