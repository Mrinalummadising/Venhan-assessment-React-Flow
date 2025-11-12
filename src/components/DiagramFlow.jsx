import React, { useCallback, useRef, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useDiagram } from "../context/DiagramContext";

const DiagramFlow = () => {
  const {
    nodes: contextNodes,
    edges: contextEdges,
    selectedNode,
    selectedEdge,
    setSelectedNode,
    setSelectedEdge,
    isSidebarOpen,
    setIsSidebarOpen,
    theme,
    toggleTheme,
    addEdge: addEdgeToContext,
    updateNode,
  } = useDiagram();

  const [nodes, setNodes, onNodesChange] = useNodesState(contextNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(contextEdges);
  const reactFlowWrapper = useRef(null);

  // Sync context nodes/edges with local state
  useEffect(() => {
    setNodes(contextNodes);
  }, [contextNodes, setNodes]);

  useEffect(() => {
    setEdges(contextEdges);
  }, [contextEdges, setEdges]);

  // Handle node selection
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
      setSelectedEdge(null);
    },
    [setSelectedNode, setSelectedEdge]
  );

  // Handle edge selection
  const onEdgeClick = useCallback(
    (event, edge) => {
      setSelectedEdge(edge);
      setSelectedNode(null);
    },
    [setSelectedEdge, setSelectedNode]
  );

  // Handle edge connection
  const onConnect = useCallback(
    (params) => {
      const newEdge = addEdge(params, edges);
      setEdges(newEdge);
      addEdgeToContext({
        source: params.source,
        target: params.target,
        type: "default",
        animated: false,
      });
    },
    [edges, setEdges, addEdgeToContext]
  );

  // Handle node drag end to update position
  const onNodeDragStop = useCallback(
    (event, node) => {
      updateNode(node.id, { position: node.position });
    },
    [updateNode]
  );

  // Handle pane click to deselect
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
  }, [setSelectedNode, setSelectedEdge]);

  // Background color based on theme
  const bgColor = theme === "dark" ? "#1a1a1a" : "#ffffff";
  const dotColor = theme === "dark" ? "#424242" : "#e0e0e0";

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: bgColor,
        transition: "background-color 0.3s ease",
      }}
      ref={reactFlowWrapper}
      className={`diagram-container ${theme}-theme`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={onPaneClick}
        fitView
        attributionPosition="bottom-left"
        style={{ backgroundColor: bgColor }}
      >
        <Background variant="dots" gap={20} size={1} color={dotColor} />
        <Controls
          style={{
            backgroundColor: theme === "dark" ? "#2a2a2a" : "#ffffff",
            border: `1px solid ${theme === "dark" ? "#424242" : "#e0e0e0"}`,
          }}
        />
        <MiniMap
          style={{
            backgroundColor: theme === "dark" ? "#2a2a2a" : "#ffffff",
            border: `1px solid ${theme === "dark" ? "#424242" : "#e0e0e0"}`,
          }}
          nodeColor={theme === "dark" ? "#646cff" : "#646cff"}
        />
        <Panel position="top-right" style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px 16px",
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#333",
              border: `1px solid ${theme === "dark" ? "#424242" : "#ddd"}`,
              borderRadius: "4px",

              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              padding: "8px 16px",
              backgroundColor: theme === "dark" ? "#2a2a2a" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#333",
              border: `1px solid ${theme === "dark" ? "#424242" : "#ddd"}`,
              borderRadius: "4px",
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            {isSidebarOpen ? "Hide" : "Show"} Sidebar
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default DiagramFlow;
