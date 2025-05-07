import React, { useState } from 'react';
import './createClient.css';

const OrderRequestPage = () => {
  const [nomeCliente, setnomeCliente]=useState('');
  const [emailCliente, setemailCLiente]=useState('');
  const [numPorta, setnumPorta]=useState('');
  const [nomeCondominio, setnomeCondominio]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      nomeCliente,
      emailCliente,
      numPorta,
      nomeCondominio
    });
    alert('Pedido enviado com sucesso!');
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="create-form">
      <h1>Associar um Cliente a um Condomínio</h1>
      
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="nomeCliente">Nome do Cliente</label>
          <input 
            type="text" 
            id="nomeCliente" 
            value={nomeCliente}
            onChange={(e) => setnomeCliente(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailCliente">Email do Cliente</label>
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
          <label htmlFor="nomeCondominio">Condomínio</label>
          <input 
            type="text" 
            id="nomeCondominio" 
            value={nomeCondominio}
            onChange={(e) => setnomeCondominio(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Enviar Pedido</button>
      </form>
    </div>
  );
};

export default OrderRequestPage;