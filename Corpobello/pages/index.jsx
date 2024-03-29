import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import Stripe from 'stripe';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Reserves from '../components/Reserves';
import Header from '../components/Header';
import downArrow from '../public/static/images/downArrow.svg';
import Masajista from '../public/static/images/Masajista1.jpeg';
import Peluquera from '../public/static/images/Peluqera.jpeg';
import styles from '../styles/Home.module.css';

export default function Home({ events, username, prices }) {
  const firstEvents = events?.slice(0, 3);
  return (
    <>
      <Head>
        <title>Corpobello</title>
        <meta
          name="description"
          content="Tu centro de estetica y peluqueria de confianza en Badalona"
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
        <link
          rel="icon"
          href="https://i.ibb.co/3Ryht66/Corpobello-Logo-Corto.png"
        />
      </Head>
      <Header username={username} />
      <main>
        <section className={styles.landingBg}>
          <div className={styles.landingSection}>
            <h3 className={styles.h3}>EN CORPOBELLO</h3>
            <h2 className={styles.h2}>
              TÚ ERES
              <br />
              LA ESTRELLA
            </h2>
            <p>
              ¡Bienvenido/a a Corpobello, el lugar donde tu belleza brilla con
              luz propia! Como centro de estética y peluquería situado en la
              encantadora ciudad de Badalona, Barcelona, nos enorgullecemos en
              ofrecerte una experiencia única y personalizada para que te
              sientas como la estrella que eres.
            </p>
            <Link href="/reserves">
              <a href="replace">RESERVA YA</a>
            </Link>
            <div className={styles.arrowbounce}>
              <Link href="#services">
                <a href="replace">
                  <Image
                    src={downArrow}
                    className={styles.arrowDown}
                    alt="Arrow Down"
                  />
                </a>
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.ourServices} id="services">
          <h3>CORPOBELLO</h3>
          <h2>NUESTROS SERVICIOS</h2>
          <hr />
          <ul className={styles.servicesCards}>
            <li className={styles.serviceCardOne}>
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
            <li className={styles.serviceCardTwo}>
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
            <li className={styles.serviceCardThree}>
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
        <Reserves prices={prices} />
        <section className={styles.ourServices}>
          <h3>CORPOBELLO</h3>
          <h2>
            APUNTATE A
            <br />
            NUESTROS EVENTOS
          </h2>
          <hr />
          <ul className={styles.servicesCards}>
            {firstEvents?.map((event) => (
              <li key={event.title} className={styles.serviceCardOne}>
                <div>
                  <h3>{event.title.toUpperCase()}</h3>
                  <h4>{event.date}</h4>
                  <p>{event.description}</p>
                  <Link href="/events">
                    <a href="replace"> CUENTAME MAS</a>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
        <picture className={styles.videoContainer}>
          <div className={styles.videoBg}>
            <iframe
              className={styles.video}
              width="922"
              height="489"
              src="https://www.youtube-nocookie.com/embed/julm2C5OWW4"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </picture>
        <section className={styles.ourEmployeesBg} id="services">
          <div className={styles.ourEmployees}>
            <h3>CORPOBELLO</h3>
            <h2>CONOCE A NUESTRO EQUIPO</h2>
            <ul className={styles.employeesCard}>
              <li>
                <div className={styles.employeesAvatarDiv}>
                  <Image
                    src={Peluquera}
                    className={styles.employeesAvatar}
                    alt="Peluqueria"
                    layout="fill"
                  />
                </div>
                <div>
                  <h3>TERESA</h3>
                  <h4>Peluqueria</h4>
                  <p>
                    Con más de una década de experiencia, Teresa crea cortes y
                    peinados que realzan tu belleza única. Su enfoque
                    personalizado y calidez te harán sentir cómodo/a en cada
                    visita.
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.employeesAvatarDiv}>
                  <Image
                    src={Masajista}
                    className={styles.employeesAvatar}
                    alt="Peluqueria"
                    layout="fill"
                  />
                </div>
                <div>
                  <h3>MARISOL SANCHEZ </h3>
                  <h4>Masajes y Estetica</h4>
                  <p>
                    Marisol ofrece masajes terapéuticos personalizados para
                    liberar tensiones y revitalizar tu cuerpo. Su ambiente
                    tranquilo te hará disfrutar de una experiencia relajante y
                    renovadora.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const { data } = await axios.get(`${baseUrl}/api/eventsHandler`);
  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_RESTRICTED_KEY, {
    apiVersion: '2020-08-27',
  });
  const prices = await stripe.prices.list({
    active: true,
    limit: 10,
    expand: ['data.product'],
  });
  return {
    props: {
      events: data,
      username: req.cookies.username || 'undefined',
      prices: prices.data,
    },
  };
}

Home.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  username: PropTypes.string.isRequired,
  prices: PropTypes.arrayOf(PropTypes.object).isRequired,
};
