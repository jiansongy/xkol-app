import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header, Navigation } from './components/layout';
import { Landing, Discover, Learn, Create, Engage, Grow, Methodology } from './pages';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/methodology';

  return (
    <div className="min-h-screen bg-background">
      {!isLandingPage && <Header />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/create" element={<Create />} />
          <Route path="/engage" element={<Engage />} />
          <Route path="/grow" element={<Grow />} />
        </Routes>
      </AnimatePresence>
      {!isLandingPage && <Navigation />}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
