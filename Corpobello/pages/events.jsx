import { PropTypes } from 'prop-types';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import stylesHome from '../styles/Home.module.css';
import styles from '../styles/Events.module.css';
import Header from '../components/Header';

export default function Events({ username, events }) {
  return (
    <>
      <Head>
        <title>Corpobello - Eventos</title>
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
      <main>
        <div className={styles.portraitDiv}>
          <h3>VEN Y CONOCENOS</h3>
          <h2>NUESTROS EVENTOS</h2>
        </div>
        <section className={styles.ourServices}>
          <ul className={stylesHome.servicesCards}>
            {events?.map((event) => (
              <li key={event.title} className={stylesHome.serviceCardOne}>
                <div>
                  <h3>{event.title.toUpperCase()}</h3>
                  <h4>{event.date}</h4>
                  <p>
                    {event.description}
                  </p>
                  <Link href="/events">
                    <a href="replace"> CUENTAME MAS</a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const { data } = await axios.get('http://localhost:3000/api/eventsHandler');
  return {
    props: {
      username: req.cookies.username || 'undefined',
      events: data,
    },
  };
}

Events.propTypes = {
  username: PropTypes.string.isRequired,
  events: PropTypes.objectOf(PropTypes.string).isRequired,
};
