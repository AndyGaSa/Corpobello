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

export default function Admin({ username, reserves }) {
  const router = useRouter();
  async function deleteReserve(reserveId) {
    try {
      await axios.delete('http://localhost:3000/api/reserveHandler', { data: { reserveId } });
      Notiflix.Report.success('Guardado!', 'Se ha borrado la reserva con exito!', 'Genial!');
      router.reload(window.location.pathname);
    } catch (error) {
      Notiflix.Report.failure('Error!', { error }, 'Ok');
    }
  }
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
          <h3>PANEL DE ADMINISTRACION</h3>
          <h2>RESERVAS</h2>
        </div>
        <section className={styles.ourServices}>
          <ul className={stylesHome.servicesCards}>
            {reserves?.map((reserve) => (
              <li key={reserve._id} className={styles.serviceCardOne}>
                <div>
                  <h3>
                    Usuario:
                    {' '}
                    {reserve.name}
                  </h3>
                  <h2>
                    Tel:
                    {' '}
                    {reserve.tel}
                  </h2>
                  <h4>
                    Dia:
                    {' '}
                    {reserve.date.day}
                  </h4>
                  <h4>
                    Hora:
                    {' '}
                    {reserve.date.hour}
                  </h4>
                  <p>
                    Personal :
                    {' '}
                    {reserve.personal}
                  </p>
                  <Link href="/reserves">
                    <a href="replace" onClick={() => deleteReserve(reserve._id)}> ELIMINAR RESERVA</a>
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
  const { data } = await axios.get('http://localhost:3000/api/reserveHandler');
  return {
    props: {
      username: req.cookies.username || 'undefined',
      reserves: data,
    },
  };
}

Admin.propTypes = {
  username: PropTypes.string.isRequired,
  reserves: PropTypes.objectOf(PropTypes.string).isRequired,
};
