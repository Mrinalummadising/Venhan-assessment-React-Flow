# Dynamic Diagram Flow - React Flow Application

A fully functional React application that utilizes React Flow to create interactive diagram flows based on dynamic metadata. This application allows you to build, edit, and manage diagram flows with nodes and edges through an intuitive UI.

## Features

- ✅ **Dynamic Rendering**: Diagrams are rendered based on JSON metadata
- ✅ **Interactive UI**: Add, edit, and delete nodes and edges through a sidebar interface
- ✅ **Node Management**: Create nodes with custom labels, types, and positions
- ✅ **Edge Management**: Connect nodes with different edge types (default, smoothstep, step, straight)
- ✅ **Metadata Import/Export**: Load and save diagram configurations as JSON
- ✅ **Responsive Design**: Works on various screen sizes
- ✅ **State Management**: Uses React Context for centralized state management
- ✅ **Visual Controls**: Includes minimap, controls, and background grid

## Project Structure

```
dynamic-diagram-flow/
├── src/
│   ├── components/
│   │   ├── DiagramFlow.jsx      # Main React Flow diagram component
│   │   ├── Sidebar.jsx          # Sidebar with tabs for controls
│   │   ├── NodeForm.jsx         # Form for adding/editing nodes
│   │   ├── EdgeForm.jsx         # Form for adding/editing edges
│   │   ├── MetadataManager.jsx  # Import/export metadata functionality
│   │   └── Sidebar.css          # Sidebar styling
│   ├── context/
│   │   └── DiagramContext.jsx   # React Context for state management
│   ├── types/
│   │   └── metadata.js          # Metadata schema and sample data
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # App-level styles
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles
├── sample-metadata.json         # Sample metadata file
├── package.json
└── README.md
```

## Installation

1. **Navigate to the project directory:**
   ```bash
   cd dynamic-diagram-flow
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

## Usage

### Basic Operations

1. **View the Diagram**: The main canvas displays the current diagram with nodes and edges.

2. **Add a Node**:
   - Click on the "Nodes" tab in the sidebar
   - Fill in the node form (label, type, position)
   - Click "Add Node"

3. **Edit a Node**:
   - Click on a node in the diagram
   - The node form will populate with the node's data
   - Modify the fields and click "Update Node"

4. **Delete a Node**:
   - Select a node by clicking on it
   - Click the "Delete Node" button in the sidebar

5. **Add an Edge**:
   - Click on the "Edges" tab in the sidebar
   - Select source and target nodes from the dropdowns
   - Configure edge type, label, and animation
   - Click "Add Edge"
   - Alternatively, drag from one node handle to another on the canvas

6. **Edit an Edge**:
   - Click on an edge in the diagram
   - Modify the edge properties in the form
   - Click "Update Edge"

7. **Delete an Edge**:
   - Select an edge by clicking on it
   - Click the "Delete Edge" button in the sidebar

### Metadata Management

1. **Export Metadata**:
   - Go to the "Metadata" tab
   - Click "Export Metadata" to copy the current diagram structure to the JSON editor
   - Click "Download JSON" to save it as a file

2. **Import Metadata**:
   - Go to the "Metadata" tab
   - Either paste JSON into the text area or click "Upload JSON File"
   - Click "Import Metadata" to load the diagram

3. **Reset to Sample**:
   - Click "Reset to Sample" to load the default sample diagram

## Metadata Schema

The application uses a JSON structure to define diagrams:

```json
{
  "nodes": [
    {
      "id": "unique-node-id",
      "type": "default|input|output",
      "position": {
        "x": 100,
        "y": 100
      },
      "data": {
        "label": "Node Label"
      }
    }
  ],
  "edges": [
    {
      "id": "unique-edge-id",
      "source": "source-node-id",
      "target": "target-node-id",
      "type": "default|smoothstep|step|straight",
      "label": "Edge Label (optional)",
      "animated": false
    }
  ]
}
```

### Node Properties

- **id** (string, required): Unique identifier for the node
- **type** (string, optional): Node type - `default`, `input`, or `output`
- **position** (object, required): Object with `x` and `y` coordinates
- **data** (object, required): Node data containing:
  - **label** (string, required): Display label for the node
  - **properties** (object, optional): Additional custom properties

### Edge Properties

- **id** (string, required): Unique identifier for the edge
- **source** (string, required): ID of the source node
- **target** (string, required): ID of the target node
- **type** (string, optional): Edge type - `default`, `smoothstep`, `step`, or `straight`
- **label** (string, optional): Label displayed on the edge
- **animated** (boolean, optional): Whether the edge should be animated

## Architecture

### State Management

The application uses React Context API (`DiagramContext`) for centralized state management:

- **Nodes State**: Array of all nodes in the diagram
- **Edges State**: Array of all edges in the diagram
- **Selection State**: Currently selected node or edge
- **UI State**: Sidebar visibility

### Component Hierarchy

```
App
├── DiagramProvider (Context Provider)
    ├── DiagramFlow (Main diagram canvas)
    └── Sidebar
        ├── NodeForm
        ├── EdgeForm
        └── MetadataManager
```

### Key Components

1. **DiagramFlow**: Main React Flow component that renders the diagram
   - Handles node/edge interactions
   - Manages drag and drop
   - Provides visual controls (minimap, zoom, pan)

2. **Sidebar**: Control panel with three tabs
   - Nodes tab: Node management
   - Edges tab: Edge management
   - Metadata tab: Import/export functionality

3. **DiagramContext**: Centralized state management
   - Provides CRUD operations for nodes and edges
   - Manages selection state
   - Handles metadata import/export

## Customization

### Adding Custom Node Types

To add custom node types, you can extend the node type options in:
- `NodeForm.jsx`: Add new options to the type select dropdown
- `DiagramFlow.jsx`: Register custom node types with React Flow

### Styling

- Global styles: `src/index.css`
- App-level styles: `src/App.css`
- Sidebar styles: `src/components/Sidebar.css`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Technologies Used

- **React 18**: UI library
- **React Flow 11**: Diagram/flowchart library
- **Vite**: Build tool and dev server
- **React Context API**: State management

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Sample Metadata

A sample metadata file (`sample-metadata.json`) is included in the project root, demonstrating a workflow diagram with multiple nodes and edges.

## Troubleshooting

### Nodes not appearing
- Check that node IDs are unique
- Verify position coordinates are valid numbers
- Ensure the metadata structure matches the schema

### Edges not connecting
- Verify source and target node IDs exist
- Check that node IDs match exactly (case-sensitive)

### Import errors
- Ensure JSON is valid
- Check that both `nodes` and `edges` arrays are present
- Verify all required fields are included

## License

This project is open source and available for use.
