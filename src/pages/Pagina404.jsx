import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';

export default function Pagina404() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h1 style={{ fontSize: '3rem', color: '#94a3b8', margin: 0 }}>404</h1>
      <h2>Página não encontrada</h2>
      <p>O recurso que você tentou acessar não existe no painel do MPred-IA.</p>
      <br/>
      <CustomButton onClick={() => navigate('/')} title="Ir para o início">
        Voltar para o Dashboard
      </CustomButton>
    </div>
  );
}