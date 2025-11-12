/**
 * Metadata Schema for Dynamic Diagram Flow
 * 
 * This file defines the structure for nodes and edges in the diagram.
 */

/**
 * Node metadata structure
 * @typedef {Object} NodeMetadata
 * @property {string} id - Unique identifier for the node
 * @property {string} type - Type of node (default, input, output, custom)
 * @property {Object} position - Position of the node {x: number, y: number}
 * @property {Object} data - Node data containing label and custom properties
 * @property {string} data.label - Display label for the node
 * @property {Object} [data.properties] - Additional custom properties
 */

/**
 * Edge metadata structure
 * @typedef {Object} EdgeMetadata
 * @property {string} id - Unique identifier for the edge
 * @property {string} source - Source node ID
 * @property {string} target - Target node ID
 * @property {string} [type] - Type of edge (default, smoothstep, step, straight)
 * @property {string} [label] - Optional label for the edge
 * @property {boolean} [animated] - Whether the edge should be animated
 * @property {string} [style] - Custom style string for the edge
 */

/**
 * Complete diagram metadata structure
 * @typedef {Object} DiagramMetadata
 * @property {NodeMetadata[]} nodes - Array of node definitions
 * @property {EdgeMetadata[]} edges - Array of edge definitions
 */

// Sample metadata structure for reference
export const sampleMetadata = {
  nodes: [
    {
      id: '1',
      type: 'default',
      position: { x: 250, y: 100 },
      data: { label: 'Start Node' }
    },
    {
      id: '2',
      type: 'default',
      position: { x: 250, y: 200 },
      data: { label: 'Process Node' }
    },
    {
      id: '3',
      type: 'default',
      position: { x: 250, y: 300 },
      data: { label: 'End Node' }
    }
  ],
  edges: [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'default',
      label: 'Flow',
      animated: false
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      type: 'default',
      label: 'Complete',
      animated: true
    }
  ]
};

