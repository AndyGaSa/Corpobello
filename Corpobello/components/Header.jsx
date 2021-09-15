/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import Link from 'next/link';
import Image from 'next/image';
import bigLogoCb from '../public/static/images/bigLogoCb.svg';

export default function Header({ username }) {
  let { pathname } = useRouter();
  pathname = pathname.substring(1);
  const [allValues, setAllValues] = useState({});
  const [homeOrNot, setHomeOrNot] = useState('bigHeader');
  const [homeOrNotMobile, setHomeOrNotMobile] = useState('mobile-menu');
  useEffect(() => {
    if (pathname.length === 0) {
      setAllValues({ home: 'actualPage anchor' });
      setHomeOrNot('bigHeader');
      setHomeOrNotMobile('mobile-menu');
    } else if (pathname === 'login' || pathname === 'signup') {
      setAllValues({ login: 'actualPage anchor' });
      setHomeOrNot('bigHeader');
      setHomeOrNotMobile('mobile-menu');
    } else {
      setAllValues({ [pathname]: 'actualPage anchor' });
      setHomeOrNot('bigHeaderPink');
      setHomeOrNotMobile('mobile-menuPink');
    }
  }, [pathname]);
  let userButtonMobile;
  let userButton;
  if (username && username === 'undefined') {
    userButtonMobile = (
      <Link href="/login">
        <div className="mobile-menu__item">
          <a href="replace" className={allValues.login ? allValues.login : 'notActual anchor'}>INICIAR SESIÓN</a>
        </div>
      </Link>
    );
    userButton = (
      <Link href="/login">
        <a href="replace" className={`anchor ${allValues.login}`}>INICIAR SESIÓN</a>
      </Link>
    );
  } else {
    userButtonMobile = (
      <Link href="/profile">
        <div className="mobile-menu__item">
          <a href="replace" className={allValues.login ? allValues.login : 'notActual anchor'}>{username?.toUpperCase()}</a>
        </div>
      </Link>
    );
    userButton = (
      <Link href="/profile">
        <a href="replace" className={`anchor ${allValues.login}`}>{username?.toUpperCase()}</a>
      </Link>
    );
  }
  return (
    <header>
      <nav className={homeOrNot}>
        <Image src={bigLogoCb} className="logo" alt="Logo" />
        <Link href="/">
          <a href="replace" className={`anchor ${allValues.home}`}>INICIO</a>
        </Link>
        <Link href="/services">
          <a href="replace" className={`anchor ${allValues.services}`}>SERVICIOS</a>
        </Link>
        <Link href="/reserves">
          <a href="replace" className={`anchor ${allValues.reserves}`}>RESERVA</a>
        </Link>
        <Link href="/events">
          <a href="replace" className={`anchor ${allValues.events}`}>EVENTOS</a>
        </Link>
        <Link href="/contact">
          <a href="replace" className={`anchor ${allValues.contact}`}>CONTACTO</a>
        </Link>
        {userButton}
      </nav>
      <nav className={homeOrNotMobile}>
        <Image src={bigLogoCb} className="logo" height={65} width={700} alt="Logo" />
        <input type="checkbox" id="checkbox" className="mobile-menu__checkbox" />
        <label htmlFor="checkbox" className="mobile-menu__btn"><div className="mobile-menu__icon" /></label>
        <div className="mobile-menu__container">
          <div className="mobile-menu__list">
            <Link href="/">
              <div className="mobile-menu__item">
                <a href="replace" className={allValues.home ? allValues.home : 'notActual anchor'}>INICIO</a>
              </div>
            </Link>
            <Link href="/services">
              <div className="mobile-menu__item">
                <a href="replace" className={allValues.services ? allValues.services : 'notActual anchor'}>SERVICIOS</a>
              </div>
            </Link>
            <Link href="/reserves">
              <div className="mobile-menu__item">
                <a href="replace" className={allValues.reserves ? allValues.reserves : 'notActual anchor'}>RESERVA</a>
              </div>
            </Link>
            <Link href="/events">
              <div className="mobile-menu__item">
                <a href="replace" className={allValues.events ? allValues.events : 'notActual anchor'}>EVENTOS</a>
              </div>
            </Link>
            <Link href="/contact">
              <div className="mobile-menu__item">
                <a href="replace" className={allValues.contact ? allValues.contact : 'notActual anchor'}>CONTACTO</a>
              </div>
            </Link>
            {userButtonMobile}
          </div>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
