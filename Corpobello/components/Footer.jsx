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
        <div className={styles.footerMap}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.808035871469!2d2.2325336159274776!3d41.443386779259065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4bb689555eb33%3A0x785edbf7358e869a!2sCorpo%20Bello!5e0!3m2!1sca!2ses!4v1631268488885!5m2!1sca!2ses" width="500" height="220" allowFullScreen="" loading="lazy" title="footerMap" />
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
