import { useState, useEffect } from 'react';
import AssetCard from '../components/AssetCard';
import FeedbackAlert from '../components/FeedbackAlert';

function ListaAtivos() {
  const [ativos, setAtivos] = useState([]);
  const [alerta, setAlerta] = useState(null);

  useEffect(() => {
    const carregarAtivos = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/ativos');
        const data = await response.json();
        setAtivos(data);
      } catch (error) {
        setAlerta({ tipo: 'erro', mensagem: 'Erro ao conectar com a API Python.' });
      }
    };
    carregarAtivos();
  }, []);

  return (
    <div className="container">
      <h2>Painel Geral de Ativos</h2>
      {alerta && <FeedbackAlert tipo={alerta.tipo} mensagem={alerta.mensagem} />}
      <div className="grid">
        {ativos.map(ativo => (
          <AssetCard key={ativo.id} ativo={ativo} />
        ))}
      </div>
    </div>
  );
}

export default ListaAtivos;