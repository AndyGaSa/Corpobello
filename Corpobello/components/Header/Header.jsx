/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import bigLogoCb from '../../images/bigLogoCb.svg';
import './Header.css';

export default function Header() {
  return (
    <header>
      <Image src={bigLogoCb} alt="Picture of the author" />
      <Link href="/">
        <a>INICIO</a>
      </Link>
      <Link href="/services">
        <a>SERVICIOS</a>
      </Link>
      <Link href="/reserves">
        <a>RESERVA</a>
      </Link>
      <Link href="/events">
        <a>EVENTOS</a>
      </Link>
      <Link href="/contact">
        <a>CONTACTO</a>
      </Link>
      <Link href="/login">
        <a>INCIAR SESION</a>
      </Link>
    </header>
  );
}
