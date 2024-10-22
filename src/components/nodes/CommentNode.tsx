import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const CommentNode: React.FC<NodeProps> = ({ id, data }) => {
  const [comment, setComment] = useState(data.comment || '');
  const [isEditing, setIsEditing] = useState(false);
  const removeNode = useFlowStore((state) => state.removeNode);

  const handleDoubleClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  }, []);

  return (
    <div className="bg-yellow-100 border-2 border-yellow-300 rounded-md p-4 shadow-md w-48">
      <Handle type="target" position={Position.Top} />
      <h3 className="font-bold mb-2">Comentario</h3>
      {isEditing ? (
        <textarea
          value={comment}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full p-1 border border-yellow-300 rounded h-24"
        />
      ) : (
        <div onDoubleClick={handleDoubleClick} className="min-h-[6rem]">
          {comment || 'Double-click to add a comment'}
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

export default CommentNode;