import React from 'react';
import { PropTypes } from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import stylesHome from '../styles/Home.module.css';
import styles from '../styles/Services.module.css';

export default function Services({ username }) {
  return (
    <>
      <Head>
        <title>Corpobello - Servicios</title>
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
          <h3>DESCUBRE</h3>
          <h2>NUESTROS SERVICIOS</h2>
        </div>
        <section className={styles.ourServices} id="services">
          <ul className={stylesHome.servicesCards}>
            <li className={stylesHome.serviceCardOne}>
              <div>
                <h3>MASAJES</h3>
                <h4>CUIDAMOS TU PELO</h4>
                <p>
                  Nuestros masajistas te brindan una experiencia relajante y
                  rejuvenecedora. ¡Descubre el bienestar en Corpobello!
                </p>
                <Link href="/services">
                  <a href="replace"> CUENTAME MAS</a>
                </Link>
              </div>
            </li>
            <li className={stylesHome.serviceCardTwo}>
              <div>
                <h3>PELUQUERIA</h3>
                <h4>CUIDAMOS TU PELO</h4>
                <p>
                  Descubre un oasis de belleza. Nuestro equipo de talentosos
                  estilistas realza tu estilo único con cortes y peinados
                  personalizados.
                </p>
                <Link href="/services">
                  <a href="replace"> CUENTAME MAS</a>
                </Link>
              </div>
            </li>
            <li className={stylesHome.serviceCardThree}>
              <div>
                <h3>SPA</h3>
                <h4>CUIDAMOS TU PELO</h4>
                <p>
                  Relájate y renueva tus sentidos en nuestro spa. Disfruta de
                  tratamientos de bienestar indulgentes y cuidadosamente
                  diseñados.
                </p>
                <Link href="/services">
                  <a href="replace"> CUENTAME MAS</a>
                </Link>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  return {
    props: { username: req.cookies.username || 'undefined' },
  };
}

Services.propTypes = {
  username: PropTypes.string.isRequired,
};
