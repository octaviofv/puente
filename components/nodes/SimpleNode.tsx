import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle, GripHorizontal } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const SimpleNode: React.FC<NodeProps> = ({ id, data }) => {
  const [text, setText] = useState(data.text || 'Simple Node');
  const [isEditing, setIsEditing] = useState(false);
  const removeNode = useFlowStore((state) => state.removeNode);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  }, []);

  return (
    <div className="bg-white shadow-sm border border-gray-200">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="node-drag-handle">
          <GripHorizontal size={16} className="text-gray-400" />
        </div>
        {isEditing ? (
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            className="w-full p-1 border border-indigo-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        ) : (
          <div onDoubleClick={handleDoubleClick} className="font-medium">
            {text}
          </div>
        )}
        <button
          onClick={() => removeNode(id)}
          className="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-150"
        >
          <XCircle size={16} />
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SimpleNode;