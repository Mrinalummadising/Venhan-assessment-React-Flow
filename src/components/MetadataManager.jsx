import { useState } from 'react';
import { useDiagram } from '../context/DiagramContext';

const MetadataManager = () => {
  const { nodes, edges, loadMetadata, resetToSample, exportMetadata } = useDiagram();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleExport = () => {
    const metadata = exportMetadata();
    const jsonString = JSON.stringify(metadata, null, 2);
    setJsonInput(jsonString);
    
    // Copy to clipboard
    navigator.clipboard.writeText(jsonString).then(() => {
      alert('Metadata copied to clipboard!');
    });
  };

  const handleImport = () => {
    try {
      setError('');
      const parsed = JSON.parse(jsonInput);
      
      if (!parsed.nodes || !parsed.edges) {
        throw new Error('Invalid metadata format. Must include nodes and edges arrays.');
      }
      
      loadMetadata(parsed);
      alert('Metadata loaded successfully!');
    } catch (err) {
      setError(err.message || 'Invalid JSON format');
    }
  };

  const handleDownload = () => {
    const metadata = exportMetadata();
    const jsonString = JSON.stringify(metadata, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram-metadata.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (!parsed.nodes || !parsed.edges) {
            throw new Error('Invalid metadata format.');
          }
          loadMetadata(parsed);
          setJsonInput(event.target.result);
          setError('');
          alert('Metadata loaded successfully!');
        } catch (err) {
          setError(err.message || 'Invalid JSON format');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="metadata-manager">
      <h3>Metadata Manager</h3>
      
      <div className="metadata-actions">
        <button onClick={handleExport} className="action-button">
          Export Metadata
        </button>
        <button onClick={handleDownload} className="action-button">
          Download JSON
        </button>
        <button onClick={resetToSample} className="action-button">
          Reset to Sample
        </button>
      </div>

      <div className="file-upload">
        <label htmlFor="file-upload" className="upload-label">
          Upload JSON File
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".json"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className="json-editor">
        <label htmlFor="json-input">Edit Metadata JSON:</label>
        <textarea
          id="json-input"
          value={jsonInput}
          onChange={(e) => {
            setJsonInput(e.target.value);
            setError('');
          }}
          placeholder='{"nodes": [...], "edges": [...]}'
          rows={15}
        />
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleImport} className="submit-button">
          Import Metadata
        </button>
      </div>

      <div className="metadata-info">
        <p><strong>Current Diagram:</strong></p>
        <p>Nodes: {nodes.length}</p>
        <p>Edges: {edges.length}</p>
      </div>
    </div>
  );
};

export default MetadataManager;

