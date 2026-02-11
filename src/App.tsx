import { Route, Routes } from 'react-router-dom';
import AgendaDia from './pages/AgendaDia';
import PacientePerfil from './pages/PacientePerfil';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AgendaDia />} />
      <Route path="/pacientes/:id" element={<PacientePerfil />} />
    </Routes>
  );
}

export default App;
