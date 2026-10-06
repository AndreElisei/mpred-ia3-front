import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ListaAtivos from './pages/ListaAtivos';
import DetalhesAtivo from './pages/DetalhesAtivo';
import Pagina404 from './pages/Pagina404';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ativos" element={<ListaAtivos />} />
          <Route path="/ativos/:id" element={<DetalhesAtivo />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;