import React from 'react';
import styles from '../styles/Reserve.module.css';

export default function Reserves() {
  return (
    <section className={styles.Reserves}>
      <div className={styles.ReservesForm}>
        <h2>RESERVA YA</h2>
      </div>
      <div className={styles.ReservesCalendar}>
        <h2>AQUI VA EL CALENDARIO</h2>
      </div>
    </section>
  );
}
