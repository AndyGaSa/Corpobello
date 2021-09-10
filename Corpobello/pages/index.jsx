/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import axios from 'axios';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Reserves from '../components/Reserves';
import downArrow from '../images/downArrow.svg';
import Masajista from '../images/Masajista1.jpeg';
import styles from '../styles/Home.module.css';

export default function Home({ events }) {
  const firstEvents = events.slice(0, 3);
  return (
    <>
      <Head>
        <title>Corpobello</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="https://i.ibb.co/3Ryht66/Corpobello-Logo-Corto.png" />
      </Head>
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
              Alimentando dentro de sí mismas el deseo de preservar la belleza
              eterna de la piel de las mujeres vietnamitas,
              no solo se ganan la confianza de los clientes gracias a un equipo profesional,
              sino que también brindan soluciones y tecnologías líderes transferidas
              desde países extranjeros hasta los estándares internacionales
            </p>
            <Link href="/reserves">
              <button type="button">RESERVA YA</button>
            </Link>
            <div className={styles.arrowbounce}>
              <Link href="#services">
                <Image src={downArrow} className={styles.arrowDown} alt="Arrow Down" />
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
                  Blanquea, desvanece la oscuridad, previene hongos / pecas y rejuvenece
                  la piel con propiedades de vitamina C pura
                </p>
                <Link href="/services">
                  <button type="button"> CUENTAME MAS</button>
                </Link>
              </div>
            </li>
            <li className={styles.serviceCardTwo}>
              <div>
                <h3>PELUQUERIA</h3>
                <h4>CUIDAMOS TU PELO</h4>
                <p>
                  Blanquea, desvanece la oscuridad, previene hongos / pecas y rejuvenece
                  la piel con propiedades de vitamina C pura
                </p>
                <Link href="/services">
                  <button type="button"> CUENTAME MAS</button>
                </Link>
              </div>
            </li>
            <li className={styles.serviceCardThree}>
              <div>
                <h3>SPA</h3>
                <h4>CUIDAMOS TU PELO</h4>
                <p>
                  Blanquea, desvanece la oscuridad, previene hongos / pecas y rejuvenece
                  la piel con propiedades de vitamina C pura
                </p>
                <Link href="/services">
                  <button type="button"> CUENTAME MAS</button>
                </Link>
              </div>
            </li>
          </ul>
        </section>
        <Reserves />
        <section className={styles.ourServices} id="services">
          <h3>CORPOBELLO</h3>
          <h2>
            APUNTATE A
            <br />
            NUESTROS EVENTOS
          </h2>
          <hr />
          <ul className={styles.servicesCards}>
            {firstEvents.map((event) => (
              <li className={styles.serviceCardOne}>
                <div>
                  <h3>{event.title.toUpperCase()}</h3>
                  <h4>{event.date}</h4>
                  <p>
                    {event.description}
                  </p>
                  <Link href="/events">
                    <button type="button"> CUENTAME MAS</button>
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
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </picture>
        <section className={styles.ourEmployeesBg} id="services">
          <div className={styles.ourEmployees}>
            <h3>CORPOBELLO</h3>
            <h2>
              CONOCE A
              NUESTRO EQUIPO
            </h2>
            <ul className={styles.employeesCard}>
              <li>
                <div className={styles.employeesAvatarDiv}>
                  <Image src={Masajista} className={styles.employeesAvatar} alt="Peluqueria" layout="fill" />
                </div>
                <div>
                  <h3>ALICIA LOPEZ</h3>
                  <h4>Peluqueria</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, sunt iure vitae alias quia hic voluptates,
                    maxime nesciunt consequuntur.
                  </p>
                </div>
              </li>
              <li>
                <div className={styles.employeesAvatarDiv}>
                  <Image src={Masajista} className={styles.employeesAvatar} alt="Peluqueria" layout="fill" />
                </div>
                <div>
                  <h3>MARISOL SANCHEZ </h3>
                  <h4>Masajes y Estetica</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Ipsam, sunt iure vitae alias quia hic voluptates,
                    maxime nesciunt consequuntur.
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

export async function getStaticProps() {
  const { data } = await axios.get('http://localhost:3000/api/eventsHandler');
  return {
    props: { events: data, content: '...' },
  };
}
