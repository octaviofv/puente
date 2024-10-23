import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle, Database } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const DatabaseNode: React.FC<NodeProps> = ({ id }) => {
  const removeNode = useFlowStore((state) => state.removeNode);

  return (
    <div className="bg-white border-2 border-purple-300 rounded-md p-4 shadow-md w-48">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center justify-center">
        <Database size={32} className="text-purple-500 mr-2" />
        <span className="font-bold">Database</span>
      </div>
      <button
        onClick={() => removeNode(id)}
        className="absolute top-0 right-0 m-1 text-red-500 hover:text-red-700"
      >
        <XCircle size={20} />
      </button>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DatabaseNode;