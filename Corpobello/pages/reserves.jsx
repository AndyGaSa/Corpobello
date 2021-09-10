import React from 'react';
import Reserves from '../components/Reserves';
import styles from '../styles/Services.module.css';

export default function ReservesPage() {
  return (
    <main>
      <div className={styles.portraitDiv}>
        <h3>CORPOBELLO</h3>
        <h2>TE ESTAMOS ESPERANDO</h2>
      </div>
      <Reserves />
    </main>
  );
}
