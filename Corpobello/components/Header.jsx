/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bigLogoCb from '../images/bigLogoCb.svg';

export default function Header() {
  let { pathname } = useRouter();
  pathname = pathname.substring(1);
  const [allValues, setAllValues] = useState({});
  const [homeOrNot, setHomeOrNot] = useState('bigHeader');
  useEffect(() => {
    if (pathname.length === 0) {
      setAllValues({ home: 'actualPage anchor' });
      setHomeOrNot('bigHeader');
    } else {
      setAllValues({ [pathname]: 'actualPage anchor' });
      setHomeOrNot('bigHeaderPink');
    }
  }, [pathname]);
  return (
    <header>
      <nav className={homeOrNot}>
        <Image src={bigLogoCb} className="logo" alt="Logo" />
        <Link href="/">
          <a className={`anchor ${allValues.home}`}>INICIO</a>
        </Link>
        <Link href="/services">
          <a className={`anchor ${allValues.services}`}>SERVICIOS</a>
        </Link>
        <Link href="/reserves">
          <a className={`anchor ${allValues.reserves}`}>RESERVA</a>
        </Link>
        <Link href="/events">
          <a className={`anchor ${allValues.events}`}>EVENTOS</a>
        </Link>
        <Link href="/contact">
          <a className={`anchor ${allValues.contact}`}>CONTACTO</a>
        </Link>
        <Link href="/login">
          <a className={`anchor ${allValues.login}`}>INICIAR SESIÓN</a>
        </Link>
      </nav>
      <nav className="mobile-menu">
        <Image src={bigLogoCb} className="logo" height={65} width={700} alt="Logo" />
        <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
        <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon" /></label>
        <div className="mobile-menu__container">
          <div className="mobile-menu__list">
            <Link href="/">
              <div className="mobile-menu__item">
                <a className={allValues.home ? allValues.home : 'notActual anchor'}>INICIO</a>
              </div>
            </Link>
            <Link href="/services">
              <div className="mobile-menu__item">
                <a className={allValues.services ? allValues.services : 'notActual anchor'}>SERVICIOS</a>
              </div>
            </Link>
            <Link href="/reserves">
              <div className="mobile-menu__item">
                <a className={allValues.reserves ? allValues.reserves : 'notActual anchor'}>RESERVA</a>
              </div>
            </Link>
            <Link href="/events">
              <div className="mobile-menu__item">
                <a className={allValues.events ? allValues.events : 'notActual anchor'}>EVENTOS</a>
              </div>
            </Link>
            <Link href="/contact">
              <div className="mobile-menu__item">
                <a className={allValues.contact ? allValues.contact : 'notActual anchor'}>CONTACTO</a>
              </div>
            </Link>
            <Link href="/login">
              <div className="mobile-menu__item">
                <a className={allValues.login ? allValues.login : 'notActual anchor'}>INICIAR SESIÓN</a>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
