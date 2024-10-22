import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const SimpleNode: React.FC<NodeProps> = ({ id, data }) => {
  const [text, setText] = useState(data.label || 'Simple Node');
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
    <div className="bg-white border-2 border-gray-300 rounded-md p-4 shadow-md">
      <Handle type="target" position={Position.Top} />
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full p-1 border border-gray-300 rounded"
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} className="font-semibold">
          {text}
        </div>
      )}
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

export default SimpleNode;