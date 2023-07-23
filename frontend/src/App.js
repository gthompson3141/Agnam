import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MangaPage from './pages/MangaPage';
import NovelPage from './pages/NovelPage';
import AnimePage from './pages/AnimePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route path="/home" element={<HomePage />} />
        {/* Routes for manga, novel, and anime pages */}
        <Route path="/manga" element={<MangaPage />} />
        <Route path="/novel" element={<NovelPage />} />
        <Route path="/anime" element={<AnimePage />} />
      </Routes>
    </Router>
  );
};

export default App;