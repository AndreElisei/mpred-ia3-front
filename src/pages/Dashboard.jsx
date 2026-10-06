import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [resumo, setResumo] = useState({ total: 0, operacionais: 0, paradas: 0 });

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ativos');
        const data = await response.json();
        
        const total = data.length;
        const operacionais = data.filter(a => a.status === 'Operacional').length;
        const paradas = total - operacionais;
        
        setResumo({ total, operacionais, paradas });
      } catch (error) {
        console.error("Erro ao carregar dashboard", error);
      }
    };
    carregarDados();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard Gerencial - RCM 4.0</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: 1, padding: '20px', border: '1px solid #ddd', borderLeft: '5px solid #007bff', borderRadius: '8px' }}>
          <h3>Total de Ativos</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{resumo.total}</p>
        </div>
        <div className="card" style={{ flex: 1, padding: '20px', border: '1px solid #ddd', borderLeft: '5px solid #28a745', borderRadius: '8px' }}>
          <h3>Operacionais</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'green' }}>{resumo.operacionais}</p>
        </div>
        <div className="card" style={{ flex: 1, padding: '20px', border: '1px solid #ddd', borderLeft: '5px solid #dc3545', borderRadius: '8px' }}>
          <h3>Em Parada/Alerta</h3>
          <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#d9534f' }}>{resumo.paradas}</p>
        </div>
      </div>
      <Link to="/ativos" style={{ padding: '10px 20px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Acessar Lista de Ativos
      </Link>
    </div>
  );
}

export default Dashboard;