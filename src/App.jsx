import { useEffect } from 'react';
import { DiagramProvider, useDiagram } from './context/DiagramContext';
import DiagramFlow from './components/DiagramFlow';
import Sidebar from './components/Sidebar';
import './App.css';

const AppContent = () => {
  const { theme } = useDiagram();

  useEffect(() => {
    document.body.className = `${theme}-theme`;
  }, [theme]);

  return (
    <div className="app-container">
      <DiagramFlow />
      <Sidebar />
    </div>
  );
};

function App() {
  return (
    <DiagramProvider>
      <AppContent />
    </DiagramProvider>
  );
}

export default App;
