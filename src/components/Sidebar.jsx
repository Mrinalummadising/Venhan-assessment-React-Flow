import { useState } from 'react';
import { useDiagram } from '../context/DiagramContext';
import NodeForm from './NodeForm';
import EdgeForm from './EdgeForm';
import MetadataManager from './MetadataManager';
import './Sidebar.css';

const Sidebar = () => {
  const {
    selectedNode,
    selectedEdge,
    deleteNode,
    deleteEdge,
    isSidebarOpen,
    theme,
    toggleTheme
  } = useDiagram();

  const [activeTab, setActiveTab] = useState('nodes');

  return (
    <div className={`sidebar ${theme}-theme ${isSidebarOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-content">
          <h2>Diagram Controls</h2>
          <button
            className="theme-toggle-button"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <span className="theme-icon">☀️</span>
            ) : (
              <span className="theme-icon">🌙</span>
            )}
            <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      <div className="sidebar-tabs">
        <button
          className={activeTab === 'nodes' ? 'active' : ''}
          onClick={() => setActiveTab('nodes')}
        >
          Nodes
        </button>
        <button
          className={activeTab === 'edges' ? 'active' : ''}
          onClick={() => setActiveTab('edges')}
        >
          Edges
        </button>
        <button
          className={activeTab === 'metadata' ? 'active' : ''}
          onClick={() => setActiveTab('metadata')}
        >
          Metadata
        </button>
      </div>

      <div className="sidebar-content">
        {activeTab === 'nodes' && (
          <div>
            <NodeForm />
            {selectedNode && (
              <div className="selected-item">
                <h3>Selected Node</h3>
                <p>ID: {selectedNode.id}</p>
                <p>Label: {selectedNode.data?.label}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteNode(selectedNode.id)}
                >
                  Delete Node
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'edges' && (
          <div>
            <EdgeForm />
            {selectedEdge && (
              <div className="selected-item">
                <h3>Selected Edge</h3>
                <p>ID: {selectedEdge.id}</p>
                <p>From: {selectedEdge.source} → To: {selectedEdge.target}</p>
                <button
                  className="delete-button"
                  onClick={() => deleteEdge(selectedEdge.id)}
                >
                  Delete Edge
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'metadata' && <MetadataManager />}
      </div>
    </div>
  );
};

export default Sidebar;

