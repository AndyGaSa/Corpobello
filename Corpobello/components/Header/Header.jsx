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
      <Image src={bigLogoCb} alt="Logo" />
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
        <a className={allValues.login}>INCIAR SESION</a>
      </Link>
    </header>
  );
}
