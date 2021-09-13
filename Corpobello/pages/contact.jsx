/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../components/Header';
import styles from '../styles/Contact.module.css';

export default function Contact({ username }) {
  return (
    <>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>CORPOBELLO</h3>
          <h2>ENCUENTRANOS</h2>
        </div>
        <div className={styles.contactContainer}>
          <div>
            <h3>CONTACTO</h3>
            <h4>DIRECCIÓN:</h4>
            <p>Calle Baldomer Sola 164</p>
            <h4>TELÉFONO:</h4>
            <p>935005616</p>
            <h4>E- MAIL:</h4>
            <p>corpobello@gmail.com</p>
            <hr />
            <h4>HORARIO:</h4>
            <p>08:00 - 20:00</p>
            <br />
            <p className={styles.horary}>
              De lunes a sábado
              <br />
              excepto festivos
            </p>
          </div>
          <div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.808035871469!2d2.2325336159274776!3d41.443386779259065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb689555eb33%3A0x785edbf7358e869a!2sCorpo%20Bello!5e0!3m2!1sca!2ses!4v1631268488885!5m2!1sca!2ses" frameBorder="0" width="800" height="450" allowFullScreen="" title="contactMap" loading="lazy" />
          </div>
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
