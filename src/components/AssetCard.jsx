import { Link } from 'react-router-dom';

// Fórmula para calcular distância em KM baseada em Latitude e Longitude
function calcularDistancia(lat2, lon2) {
  const lat1 = -22.469; // Lat da Base Técnica/Seguradora (Resende)
  const lon1 = -44.449; // Lon da Base Técnica/Seguradora
  const R = 6371; // Raio da Terra em km
  
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

function AssetCard({ ativo }) {
  const distanciaKm = calcularDistancia(ativo.latitude, ativo.longitude);

  // Cumpre a exigência do método DELETE do Front-end
  const deletarAtivo = async () => {
    if (window.confirm(`Tem certeza que deseja excluir a placa/tag ${ativo.tag}?`)) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ativos/${ativo.id}`, { 
          method: 'DELETE' 
        });
        if (response.ok) {
          window.location.reload(); 
        } else {
          alert("Erro ao excluir o ativo.");
        }
      } catch (error) {
        alert("Erro de conexão ao tentar excluir.");
      }
    }
  };

  return (
    <div className="card" style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '15px', background: 'white' }}>
      <h3>{ativo.nome}</h3>
      <p><strong>Placa / TAG:</strong> {ativo.tag}</p>
      
      <div style={{ margin: '15px 0', padding: '10px', background: '#f8f9fa', borderRadius: '5px', fontSize: '0.9em' }}>
        <p style={{ margin: '5px 0' }}><strong>📍 Localização (GPS):</strong> <br/>{ativo.latitude}, {ativo.longitude}</p>
        <p style={{ margin: '5px 0' }}><strong>🛣️ Distância do Guincho:</strong> {distanciaKm} km</p>
      </div>

      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: ativo.status === 'Operacional' ? 'green' : '#d9534f', fontWeight: 'bold' }}>
          {ativo.status}
        </span>
      </p>
      
      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        <Link 
          to={`/ativos/${ativo.id}`} 
          style={{ flex: 1, textAlign: 'center', padding: '8px 12px', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
        >
          Acessar Telemetria
        </Link>
        <button 
          onClick={deletarAtivo} 
          style={{ padding: '8px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default AssetCard;