import { useState, useEffect } from 'react';
import { useDiagram } from '../context/DiagramContext';

const NodeForm = () => {
  const { addNode, updateNode, selectedNode, nodes } = useDiagram();
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    type: 'default',
    x: 0,
    y: 0
  });

  useEffect(() => {
    if (selectedNode) {
      setFormData({
        id: selectedNode.id,
        label: selectedNode.data?.label || '',
        type: selectedNode.type || 'default',
        x: selectedNode.position.x,
        y: selectedNode.position.y
      });
    } else {
      setFormData({
        id: '',
        label: '',
        type: 'default',
        x: 0,
        y: 0
      });
    }
  }, [selectedNode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedNode) {
      // Update existing node
      updateNode(selectedNode.id, {
        type: formData.type,
        position: { x: Number(formData.x), y: Number(formData.y) },
        data: {
          ...selectedNode.data,
          label: formData.label
        }
      });
    } else {
      // Add new node
      addNode({
        id: formData.id || undefined,
        type: formData.type,
        position: { x: Number(formData.x), y: Number(formData.y) },
        data: {
          label: formData.label || 'New Node'
        }
      });
      // Reset form
      setFormData({
        id: '',
        label: '',
        type: 'default',
        x: 0,
        y: 0
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="node-form">
      <h3>{selectedNode ? 'Edit Node' : 'Add New Node'}</h3>
      
      <div className="form-group">
        <label htmlFor="label">Label:</label>
        <input
          type="text"
          id="label"
          name="label"
          value={formData.label}
          onChange={handleChange}
          required
          placeholder="Enter node label"
        />
      </div>

      <div className="form-group">
        <label htmlFor="type">Type:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="default">Default</option>
          <option value="input">Input</option>
          <option value="output">Output</option>
        </select>
      </div>

      {!selectedNode && (
        <div className="form-group">
          <label htmlFor="id">ID (optional):</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Auto-generated if empty"
          />
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="x">X Position:</label>
          <input
            type="number"
            id="x"
            name="x"
            value={formData.x}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="y">Y Position:</label>
          <input
            type="number"
            id="y"
            name="y"
            value={formData.y}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        {selectedNode ? 'Update Node' : 'Add Node'}
      </button>
    </form>
  );
};

export default NodeForm;

