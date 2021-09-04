/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bigLogoCb from '../../images/bigLogoCb.svg';

export default function Header() {
  let { pathname } = useRouter();
  pathname = pathname.substring(1);
  const [allValues, setAllValues] = useState({});
  useEffect(() => {
    if (pathname.length === 0) {
      setAllValues({ home: 'actualPage' });
    } else {
      setAllValues({ [pathname]: 'actualPage' });
    }
  }, [pathname]);
  return (
    <header>
      <nav className="bigHeader">
        <Image src={bigLogoCb} className="logo" alt="Logo" />
        <Link href="/">
          <a className={allValues.home}>INICIO</a>
        </Link>
        <Link href="/services">
          <a className={allValues.services}>SERVICIOS</a>
        </Link>
        <Link href="/reserves">
          <a className={allValues.reserves}>RESERVA</a>
        </Link>
        <Link href="/events">
          <a className={allValues.events}>EVENTOS</a>
        </Link>
        <Link href="/contact">
          <a className={allValues.contact}>CONTACTO</a>
        </Link>
        <Link href="/login">
          <a className={allValues.login}>INICIAR SESIÓN</a>
        </Link>
      </nav>
      <nav className="mobile-menu">
        <Image src={bigLogoCb} className="logo" height={65} width={700} alt="Logo" />
        <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
        <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon" /></label>
        <div className="mobile-menu__container">
          <div className="mobile-menu__list">
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">INICIO</a></Link>
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">SERVICIOS</a></Link>
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">RESERVA</a></Link>
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">EVENTOS</a></Link>
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">CONTACTO</a></Link>
            <Link href="#" className="mobile-menu__item"><a className="mobile-menu__link">INICIAR SESIÓN</a></Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
