/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Reserves from '../components/Reserves';
import downArrow from '../images/downArrow.svg';
import styles from '../styles/Home.module.css';

export default function Home() {
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
      </main>
    </>
  );
}
