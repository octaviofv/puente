import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle, Send } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';

const WebhookNode: React.FC<NodeProps> = ({ id, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [webhookUrl, setWebhookUrl] = useState(data.webhookUrl || '');
  const removeNode = useFlowStore((state) => state.removeNode);

  const handleSend = useCallback(async () => {
    if (!webhookUrl) {
      alert('Please enter a webhook URL');
      return;
    }
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        alert('Webhook sent successfully');
        setIsOpen(false);
        setText('');
      } else {
        alert('Failed to send webhook');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }, [webhookUrl, text]);

  return (
    <div className="bg-white border-2 border-indigo-300 rounded-md p-4 shadow-md w-64">
      <Handle type="target" position={Position.Top} />
      <h3 className="font-bold mb-2">Webhook Node</h3>
      <input
        type="text"
        value={webhookUrl}
        onChange={(e) => setWebhookUrl(e.target.value)}
        placeholder="Webhook URL"
        className="w-full p-1 mb-2 border border-gray-300 rounded"
      />
      <button
        onClick={() => setIsOpen(true)}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <Send className="mr-2" size={16} />
        Open Popup
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-96">
            <h4 className="font-bold mb-2">Enter Text</h4>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Send
              </button>
            </div>
          </div>
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

export default WebhookNode;