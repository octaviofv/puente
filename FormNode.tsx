import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle, PlusCircle, Trash } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

interface FormField {
  id: string;
  type: string;
  label: string;
}

const FormNode: React.FC<NodeProps> = ({ id, data }) => {
  const [fields, setFields] = useState<FormField[]>(data.fields || []);
  const removeNode = useFlowStore((state) => state.removeNode);

  const addField = useCallback(() => {
    setFields((prevFields) => [
      ...prevFields,
      { id: Date.now().toString(), type: 'text', label: 'New Field' },
    ]);
  }, []);

  const removeField = useCallback((fieldId: string) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== fieldId));
  }, []);

  const updateField = useCallback((fieldId: string, key: keyof FormField, value: string) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === fieldId ? { ...field, [key]: value } : field
      )
    );
  }, []);

  return (
    <div className="bg-white border-2 border-green-300 rounded-md p-4 shadow-md w-64">
      <Handle type="target" position={Position.Top} />
      <h3 className="font-bold mb-2">Form Node</h3>
      {fields.map((field) => (
        <div key={field.id} className="mb-2">
          <input
            type="text"
            value={field.label}
            onChange={(e) => updateField(field.id, 'label', e.target.value)}
            className="w-full p-1 mb-1 border border-gray-300 rounded"
          />
          <select
            value={field.type}
            onChange={(e) => updateField(field.id, 'type', e.target.value)}
            className="w-full p-1 mb-1 border border-gray-300 rounded"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="date">Date</option>
          </select>
          <button
            onClick={() => removeField(field.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={addField}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mt-2"
      >
        <PlusCircle className="mr-2" size={16} />
        Add Field
      </button>
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

export default FormNode;