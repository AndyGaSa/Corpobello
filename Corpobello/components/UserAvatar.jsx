import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import styles from '../styles/UserAvatar.module.css';

export default function UserAvatar() {
  const [profileImg, setImg] = useState('https://peru21.pe/resizer/TXxtyJjG3tta6dCsEvqqccFw_zY=/1200x1200/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/MHTXJWI6VZFNNKIM3HM5LKBFWE.jpg');
  function onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
      setImg(URL.createObjectURL(event.target.files[0]));
    }
  }
  return (
    <div className="UserAvatarDiv">
      <Avatar alt="Jhon Snow" src={profileImg} className={styles.UserAvatarImg} />
      <div>
        <label htmlFor="icon-button-file" className={styles.editIconDiv}>
          <input accept="image/*" className={styles.inputUpload} onChange={onImageChange} id="icon-button-file" type="file" />
          <IconButton aria-label="upload picture" className={styles.iconButton} component="span">
            <EditIcon style={{ color: 'white' }} />
          </IconButton>
        </label>
      </div>
    </div>
  );
}
