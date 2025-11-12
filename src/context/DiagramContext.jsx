import { createContext, useContext, useState, useCallback } from 'react';
import { sampleMetadata } from '../types/metadata';

const DiagramContext = createContext(null);

export const useDiagram = () => {
  const context = useContext(DiagramContext);
  if (!context) {
    throw new Error('useDiagram must be used within DiagramProvider');
  }
  return context;
};

export const DiagramProvider = ({ children }) => {
  const [nodes, setNodes] = useState(sampleMetadata.nodes);
  const [edges, setEdges] = useState(sampleMetadata.edges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Node operations
  const addNode = useCallback((nodeData) => {
    const newNode = {
      id: nodeData.id || `node-${Date.now()}`,
      type: nodeData.type || 'default',
      position: nodeData.position || { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: nodeData.data?.label || 'New Node',
        ...nodeData.data
      }
    };
    setNodes((prev) => [...prev, newNode]);
    return newNode;
  }, []);

  const updateNode = useCallback((nodeId, updates) => {
    setNodes((prev) =>
      prev.map((node) =>
        node.id === nodeId ? { ...node, ...updates } : node
      )
    );
  }, []);

  const deleteNode = useCallback((nodeId) => {
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    // Also delete connected edges
    setEdges((prev) =>
      prev.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
    );
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [selectedNode]);

  // Edge operations
  const addEdge = useCallback((edgeData) => {
    const newEdge = {
      id: edgeData.id || `edge-${Date.now()}`,
      source: edgeData.source,
      target: edgeData.target,
      type: edgeData.type || 'default',
      label: edgeData.label || '',
      animated: edgeData.animated || false,
      style: edgeData.style || {}
    };
    setEdges((prev) => [...prev, newEdge]);
    return newEdge;
  }, []);

  const updateEdge = useCallback((edgeId, updates) => {
    setEdges((prev) =>
      prev.map((edge) =>
        edge.id === edgeId ? { ...edge, ...updates } : edge
      )
    );
  }, []);

  const deleteEdge = useCallback((edgeId) => {
    setEdges((prev) => prev.filter((edge) => edge.id !== edgeId));
    if (selectedEdge?.id === edgeId) {
      setSelectedEdge(null);
    }
  }, [selectedEdge]);

  // Load metadata
  const loadMetadata = useCallback((metadata) => {
    if (metadata.nodes) {
      setNodes(metadata.nodes);
    }
    if (metadata.edges) {
      setEdges(metadata.edges);
    }
  }, []);

  // Reset to sample
  const resetToSample = useCallback(() => {
    setNodes(sampleMetadata.nodes);
    setEdges(sampleMetadata.edges);
    setSelectedNode(null);
    setSelectedEdge(null);
  }, []);

  // Export metadata
  const exportMetadata = useCallback(() => {
    return {
      nodes,
      edges
    };
  }, [nodes, edges]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = {
    nodes,
    edges,
    selectedNode,
    selectedEdge,
    isSidebarOpen,
    theme,
    setSelectedNode,
    setSelectedEdge,
    setIsSidebarOpen,
    toggleTheme,
    addNode,
    updateNode,
    deleteNode,
    addEdge,
    updateEdge,
    deleteEdge,
    loadMetadata,
    resetToSample,
    exportMetadata
  };

  return (
    <DiagramContext.Provider value={value}>
      {children}
    </DiagramContext.Provider>
  );
};

