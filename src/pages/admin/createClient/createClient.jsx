import React, { useState } from 'react';
import './createClient.css';

const OrderRequestPage = () => {
  const [orderType, setOrderType] = useState('');
  const [subject, setSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      orderType,
      subject,
      file: selectedFile ? selectedFile.name : 'No file selected'
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
          <label htmlFor="subject">Nome do Cliente</label>
          <input 
            type="text" 
            id="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Email do Cliente</label>
          <input 
            type="text" 
            id="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Nº da Porta</label>
          <input 
            type="text" 
            id="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Condomínio</label>
          <input 
            type="text" 
            id="subject" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="button">Enviar Pedido</button>
      </form>
    </div>
  );
};

export default OrderRequestPage;