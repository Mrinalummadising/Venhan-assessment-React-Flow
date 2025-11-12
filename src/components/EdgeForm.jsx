import { useState, useEffect } from 'react';
import { useDiagram } from '../context/DiagramContext';

const EdgeForm = () => {
  const { addEdge, updateEdge, selectedEdge, nodes } = useDiagram();
  const [formData, setFormData] = useState({
    source: '',
    target: '',
    type: 'default',
    label: '',
    animated: false
  });

  useEffect(() => {
    if (selectedEdge) {
      setFormData({
        source: selectedEdge.source,
        target: selectedEdge.target,
        type: selectedEdge.type || 'default',
        label: selectedEdge.label || '',
        animated: selectedEdge.animated || false
      });
    } else {
      setFormData({
        source: '',
        target: '',
        type: 'default',
        label: '',
        animated: false
      });
    }
  }, [selectedEdge]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedEdge) {
      // Update existing edge
      updateEdge(selectedEdge.id, {
        type: formData.type,
        label: formData.label,
        animated: formData.animated
      });
    } else {
      // Add new edge
      addEdge({
        source: formData.source,
        target: formData.target,
        type: formData.type,
        label: formData.label,
        animated: formData.animated
      });
      // Reset form
      setFormData({
        source: '',
        target: '',
        type: 'default',
        label: '',
        animated: false
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="edge-form">
      <h3>{selectedEdge ? 'Edit Edge' : 'Add New Edge'}</h3>
      
      <div className="form-group">
        <label htmlFor="source">Source Node:</label>
        <select
          id="source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
          disabled={!!selectedEdge}
        >
          <option value="">Select source node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data?.label || node.id}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="target">Target Node:</label>
        <select
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          required
          disabled={!!selectedEdge}
        >
          <option value="">Select target node</option>
          {nodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.data?.label || node.id}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="type">Edge Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="default">Default</option>
          <option value="smoothstep">Smooth Step</option>
          <option value="step">Step</option>
          <option value="straight">Straight</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="label">Label (optional):</label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder="Edge label"
        />
      </div>

      <div className="form-group">
        <label htmlFor="animated">
          <input
            type="checkbox"
            id="animated"
            name="animated"
            checked={formData.animated}
            onChange={handleChange}
          />
          Animated
        </label>
      </div>

      <button type="submit" className="submit-button">
        {selectedEdge ? 'Update Edge' : 'Add Edge'}
      </button>
    </form>
  );
};

export default EdgeForm;

