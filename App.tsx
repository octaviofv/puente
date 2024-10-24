import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, Edge } from 'reactflow';
import 'reactflow/dist/style.css';
import Toolbar from './components/Toolbar';
import { useFlowStore } from './store/flowStore';
import SimpleNode from './components/nodes/SimpleNode';
import HttpNode from './components/nodes/HttpNode';
import FormNode from './components/nodes/FormNode';
import CommentNode from './components/nodes/CommentNode';
import DatabaseNode from './components/nodes/DatabaseNode';
import WebhookNode from './components/nodes/WebhookNode';
import { PlusCircle, Trash2, Play, XCircle } from 'lucide-react';

const nodeTypes = {
  simpleNode: SimpleNode,
  httpNode: HttpNode,
  formNode: FormNode,
  commentNode: CommentNode,
  databaseNode: DatabaseNode,
  webhookNode: WebhookNode,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: {
    strokeWidth: 2,
    stroke: '#6366f1',
  },
};

function App() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, clearFlow, executeFlow } = useFlowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      addNode(type, position);
    },
    [addNode]
  );

  return (
    <div className="h-screen flex">
      <Toolbar />
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Puente OS</h1>
          <div className="space-x-4">
            <button
              onClick={executeFlow}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              <Play className="mr-2" size={20} />
              Execute Flow
            </button>
            <button
              onClick={clearFlow}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center"
            >
              <Trash2 className="mr-2" size={20} />
              Clear Flow
            </button>
          </div>
        </div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          onDragOver={onDragOver}
          onDrop={onDrop}
          fitView
          className="bg-gray-50"
        >
          <Background color="#e5e7eb" gap={16} size={1} />
          <Controls className="m-4" />
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;