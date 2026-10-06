import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FeedbackAlert from '../components/FeedbackAlert';

function DetalhesAtivo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [telemetria, setTelemetria] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [ordemServico, setOrdemServico] = useState(null); // Guarda a OS criada

  useEffect(() => {
    const fetchTelemetria = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ativos/${id}/telemetria`);
        if (response.ok) {
          const data = await response.json();
          setTelemetria(data);
        }
      } catch (error) {
        console.error("Erro na telemetria");
      }
    };
    fetchTelemetria();
    const interval = setInterval(fetchTelemetria, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const despacharEquipe = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/ativos/${id}/despacho?diagnostico=${encodeURIComponent(telemetria.diagnostico_ia)}&mttr=${telemetria.mttr_estimado_horas}`, {
        method: 'POST'
      });
      if (response.ok) {
        const data = await response.json();
        setOrdemServico(data); // Salva os dados da OS na tela
        setAlerta({ tipo: 'sucesso', mensagem: `Guincho acionado! SLA de Chegada: ${data.sla_chegada_minutos} min.` });
      } else {
        setAlerta({ tipo: 'erro', mensagem: 'Falha no Back-end ao gerar a OS.' });
      }
    } catch (error) {
      setAlerta({ tipo: 'erro', mensagem: 'Erro de conexão ao despachar equipe.' });
    }
  };

  // NOVO: Cumprindo o requisito PATCH do Front-end
  const finalizarOS = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/ordens/${ordemServico.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status_os: 'Concluída', tempo_real_operador: 2.5, custo_total: 450.00 })
      });
      if (response.ok) {
        setAlerta({ tipo: 'sucesso', mensagem: 'Ordem de Serviço Finalizada com Sucesso! (Custo: R$450,00)' });
        setOrdemServico(null); // Limpa a tela
      }
    } catch (error) {
      setAlerta({ tipo: 'erro', mensagem: 'Erro ao finalizar OS.' });
    }
  };

  return (
    <div className="container">
      <h2>Painel do Ativo {id}</h2>
      {alerta && <FeedbackAlert tipo={alerta.tipo} mensagem={alerta.mensagem} />}
      
      {telemetria ? (
        <div style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
          <h3>Diagnóstico: <span style={{ color: telemetria.diagnostico_ia !== 'Normal' ? 'red' : 'green' }}>{telemetria.diagnostico_ia}</span></h3>
          <p><strong>Vibração Média:</strong> {telemetria.vibracao_mms} mm/s</p>
          <p><strong>Temperatura:</strong> {telemetria.temperatura_c} °C</p>
          
          {!ordemServico ? (
             <button onClick={despacharEquipe} style={{ marginTop: '15px', background: '#d9534f', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
               🚨 Acionar Guincho / Despachar Equipe
             </button>
          ) : (
             <div style={{ marginTop: '20px', padding: '15px', background: '#e2e3e5', borderRadius: '5px', borderLeft: '5px solid #007bff' }}>
                <h4>OS #{ordemServico.id} em Andamento</h4>
                <p>Equipe a caminho. MTTR Estimado: {ordemServico.mttr_estimado_horas}h</p>
                <button onClick={finalizarOS} style={{ marginTop: '10px', background: '#28a745', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                  ✅ Finalizar Ordem de Serviço
                </button>
             </div>
          )}
        </div>
      ) : (
        <p>A conectar...</p>
      )}
      <button onClick={() => navigate('/ativos')} style={{ marginTop: '20px', padding: '8px 15px' }}>Voltar</button>
    </div>
  );
}

export default DetalhesAtivo;