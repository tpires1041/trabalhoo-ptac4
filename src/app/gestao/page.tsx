'use client';

import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';

const Gestao = () => {
  return (
    <>
      <Header />
      
      <div className="container">
        <h1>Gestão</h1>
        <div className="gestaoMenu">
          <Link href="/gestao/reservasgestao">
            <button className="botao">Gerenciar Reservas</button>
          </Link>
          <Link href="/gestao/mesasgestao">
            <button className="botao">Gerenciar Mesas</button>
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Gestao;
