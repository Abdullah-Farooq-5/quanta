// filepath: d:\contour\quanta\frontend\src\App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop'; // Button to scroll up
import ScrollRestoration from './components/common/ScrollRestoration'; // Automatic scroll on navigation
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import SimulationPage from './pages/SimulationPage';
import GlossaryPage from './pages/GlossaryPage';
import QuizPage from './pages/QuizPage';
import ExplorePage from './pages/ExplorePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <ScrollRestoration /> {/* Add this inside the Router */}
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/simulation" element={<SimulationPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTop /> 
      </div>
    </Router>
  );
}

export default App;