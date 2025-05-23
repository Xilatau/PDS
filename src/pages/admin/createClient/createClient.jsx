import React, { useState } from 'react';
import { createClient } from '../../../api/ApiClient.jsx';
import './createClient.css';

const OrderRequestPage = () => {
  const [nomeCliente, setnomeCliente]=useState('');
  const [emailCliente, setemailCLiente]=useState('');
  const [numPorta, setnumPorta]=useState('');
  const [nif, setnif]=useState(0);
  const [password, setpassword]=useState('');

  const getCondoId = async () => {
    try {
      const response = await fetch('https://localhost:7061/user/' + localStorage.getItem("userId"));
      if (!response.ok) throw new Error("Erro na API");
      const data = await response.json();
      console.log("Dados recebidos:", data);
      return data;
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      return null;
    }
  };

  const cleanFields = () => {
    setnomeCliente('');
    setemailCLiente('');
    setnumPorta('');
    setnif('');
    setpassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await getCondoId();
    console.log(user);
    // Handle form submission logic here
    console.log({
      nomeCliente,
      emailCliente,
      numPorta,
      idCondominio:user.condominioId
    });

    createClient({
      nome: nomeCliente,
      nif: nif,
      contacto: emailCliente,
      contactoTag: "",
      nPorta: numPorta,
      password: password,
      condominioId: user.condominioId
    });
    cleanFields();
    alert('Pedido enviado com sucesso!');
  };

  return (
    <main className='dashboard'>
      <div className="create-form">
      <h1>Criar Condómino</h1>
      
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="nomeCliente">Nome do Condómino</label>
          <input 
            type="text" 
            id="nomeCliente" 
            value={nomeCliente}
            onChange={(e) => setnomeCliente(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="nif">NIF</label>
          <input 
            type="number" 
            id="nif" 
            value={nif}
            onChange={(e) => setnif(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailCliente">Contacto Condómino</label>
          <input 
            type="text" 
            id="emailCliente" 
            value={emailCliente}
            onChange={(e) => setemailCLiente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPorta">Nº da Porta</label>
          <input 
            type="number" 
            id="numPorta" 
            value={numPorta}
            onChange={(e) => setnumPorta(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Criar Condómino</button>
      </form>
    </div>
    </main>
  );
};

export default OrderRequestPage;