import React, { useState } from 'react';
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
} from '@material-ui/core';

import styles from '../styles/UserForm.module.css';

export default function UserForm() {
  const [userTitle, setUserTitle] = useState('');
  const [legend, setLegend] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [mailTitle, setMailTitle] = useState('');
  const [mailLegend, setMailLegend] = useState('');
  const [mailErrorTitle, setMailErrorTitle] = useState(false);
  const [RadioValue, setRadioValue] = React.useState('');
  const [RadioErrorText, setRadioErrorText] = React.useState('');
  const [RadioError, setRadioError] = React.useState(false);

  const RadioHandleChange = (event) => {
    setRadioValue(event.target.value);
    if (event.target.value.length < 1) {
      setRadioErrorText('Gender is required');
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

    if (RadioValue.length < 1) {
      setRadioErrorText('Gender is required');
      setRadioError(true);
    } else {
      setRadioErrorText('');
      setRadioError(false);
    }
  }
  return (
    <form className={styles.UserForm} data-testid="userForm">
      <div className={styles.UserForm__UserMail}>
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
          label="Username"
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
          label="Email"
          helperText={mailLegend}
          variant="outlined"
        />
      </div>
      <FormControl component="fieldset" error={RadioError}>
        <FormLabel className={styles.RadioFormLabel} component="legend">Gender</FormLabel>
        <RadioGroup aria-label="gender" id="radioButtons" name="gender1" value={RadioValue} onChange={RadioHandleChange}>
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormHelperText>{RadioErrorText}</FormHelperText>
        </RadioGroup>
      </FormControl>
      <div>
        <div htmlFor="Bio" className={styles.BioForm}>
          <span>Bio</span>
          <TextareaAutosize aria-label="empty textarea" placeholder="King of The North" className={styles.TextArea} />
        </div>
      </div>
      <Button variant="contained" onClick={() => checkValidation()} data-testid="saveButton" color="primary">
        SAVE
      </Button>
    </form>

  );
}
