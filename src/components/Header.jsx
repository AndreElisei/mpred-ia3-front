import { Link } from 'react-router-dom';
import logo from '../assets/react.svg'; // Ou o logo da sua empresa

function Header() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', background: '#222', color: 'white', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Logo" width="30" />
        <h1 style={{ margin: 0, fontSize: '20px' }}>RCM 4.0 Telemetria</h1>
      </div>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Dashboard</Link>
        <Link to="/ativos" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Ativos</Link>
      </nav>
    </header>
  );
}

export default Header;