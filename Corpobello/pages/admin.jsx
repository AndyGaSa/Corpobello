/* eslint-disable no-underscore-dangle */
import { PropTypes } from 'prop-types';
import { useRouter } from 'next/router';
import Notiflix from 'notiflix';
import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import stylesHome from '../styles/Home.module.css';
import styles from '../styles/Events.module.css';
import Header from '../components/Header';

export default function Admin({ username, reserves, events }) {
  const router = useRouter();
  async function deleteReserve(reserveId) {
    try {
      await axios.delete('/api/reserveHandler', { data: { reserveId } });
      Notiflix.Report.success(
        'Guardado!',
        'Se ha borrado la reserva con exito!',
        'Genial!'
      );
      router.reload(window.location.pathname);
    } catch (error) {
      Notiflix.Report.failure('Error!', { error }, 'Ok');
    }
  }
  async function deleteEvent(eventId) {
    try {
      await axios.delete('/api/eventsHandler', { data: { eventId } });
      Notiflix.Report.success(
        'Guardado!',
        'Se ha borrado el evento con exito!',
        'Genial!'
      );
      router.reload(window.location.pathname);
    } catch (error) {
      Notiflix.Report.failure('Error!', { error }, 'Ok');
    }
  }
  return (
    <>
      <Head>
        <title>Corpobello - Eventos</title>
        <meta
          name="description"
          content="Tu centro de estetica y peluqueria de confianza en Badalona"
        />
        <link
          rel="icon"
          href="https://i.ibb.co/3Ryht66/Corpobello-Logo-Corto.png"
        />
        <meta charset="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="keywords"
          content="Estetica Belleza Peluqueria Salon Masajes Masaje Spa Badalona"
        />

        <link rel="manifest" href="/manifest.webmanifest" />

        <meta name="theme-color" content="#417505" />
      </Head>
      <Header username={username} />
      <main>
        <div className={styles.portraitDiv}>
          <h3>CORPOBELLO</h3>
          <h2>PANEL DE ADMINISTRACION</h2>
        </div>
        <section className={styles.ourServices}>
          <h2>RESERVAS: </h2>
          <ul className={stylesHome.servicesCards}>
            {reserves?.map((reserve) => (
              <li key={reserve._id} className={styles.serviceCardOne}>
                <div>
                  <h3>Usuario: {reserve.name}</h3>
                  <h2>Tel: {reserve.tel}</h2>
                  <h4>Dia: {reserve.date.day}</h4>
                  <h4>Hora: {reserve.date.hour}</h4>
                  <p>Personal : {reserve.personal}</p>
                  <Link href="/admin">
                    <a
                      href="replace"
                      onClick={() => deleteReserve(reserve._id)}
                    >
                      {' '}
                      ELIMINAR RESERVA
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <h2>EVENTOS:</h2>
          <ul className={stylesHome.servicesCards}>
            {events?.map((event) => (
              <li key={event.title} className={styles.serviceCardTwo}>
                <div>
                  <h3>{event.title.toUpperCase()}</h3>
                  <h4>{event.date}</h4>
                  <p>{event.description}</p>
                  <Link href="/admin">
                    <a href="replace" onClick={() => deleteEvent(event._id)}>
                      {' '}
                      ELIMINAR EVENTO
                    </a>
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
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const { data } = await axios.get(`${baseUrl}/api/reserveHandler`);
  const events = await axios.get(`${baseUrl}/api/eventsHandler`);
  return {
    props: {
      username: req.cookies.username || 'undefined',
      reserves: data,
      events: events.data,
    },
  };
}

Admin.propTypes = {
  username: PropTypes.string.isRequired,
  reserves: PropTypes.objectOf(PropTypes.string).isRequired,
  events: PropTypes.objectOf(PropTypes.string).isRequired,
};
