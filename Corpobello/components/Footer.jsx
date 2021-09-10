import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import bigLogoCb from '../images/bigLogoCb.svg';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerTextContainer}>
        <div>
          <Image src={bigLogoCb} className="logo" alt="footer Logo" />
        </div>
        <div>
          <h5>DIRECCIÓN:</h5>
          <p>Calle Baldomer Sola 164</p>
          <h5>TELÉFONO:</h5>
          <p>935005616</p>
          <h5>E- MAIL:</h5>
          <p>corpobello@gmail.com</p>
        </div>
        <div>
          <h5>HORARIO:</h5>
          <p>08:00 - 20:00</p>
          <br />
          <p className={styles.horary}>
            De lunes a sábado
            <br />
            excepto festivos
          </p>
          <h5>NUESTRAS REDES:</h5>
          <Link href="https://m.facebook.com/corpobelloBCN/?locale2=es_ES">
            <FaFacebook className="rrssIcon" size={30} />
          </Link>
          <Link href="https://www.instagram.com/corpobellointegral/">
            <FaInstagram className="rrssIcon" size={30} />
          </Link>
        </div>
      </div>
      <div className={styles.footerCopyContainer}>
        <span>Copyright © 2021 CORPOBELLO.</span>
      </div>
    </footer>
  );
}
