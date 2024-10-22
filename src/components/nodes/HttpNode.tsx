import React, { useState, useCallback } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { XCircle, Send } from 'lucide-react';
import { useFlowStore } from '../../store/flowStore';
import axios from 'axios';

const HttpNode: React.FC<NodeProps> = ({ id, data }) => {
  const [url, setUrl] = useState(data.url || '');
  const [method, setMethod] = useState(data.method || 'GET');
  const [headers, setHeaders] = useState(data.headers || '');
  const [body, setBody] = useState(data.body || '');
  const [response, setResponse] = useState('');
  const removeNode = useFlowStore((state) => state.removeNode);

  const handleTest = useCallback(async () => {
    try {
      const config = {
        method,
        url,
        headers: headers ? JSON.parse(headers) : {},
        data: body ? JSON.parse(body) : undefined,
      };
      const res = await axios(config);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }
  }, [url, method, headers, body]);

  return (
    <div className="bg-white border-2 border-blue-300 rounded-md p-4 shadow-md w-64">
      <Handle type="target" position={Position.Top} />
      <h3 className="font-bold mb-2">HTTP Request</h3>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="w-full p-1 mb-2 border border-gray-300 rounded"
      />
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full p-1 mb-2 border border-gray-300 rounded"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </select>
      <textarea
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        placeholder="Headers (JSON)"
        className="w-full p-1 mb-2 border border-gray-300 rounded h-20"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body (JSON)"
        className="w-full p-1 mb-2 border border-gray-300 rounded h-20"
      />
      <button
        onClick={handleTest}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <Send className="mr-2" size={16} />
        Test Request
      </button>
      {response && (
        <div className="mt-4">
          <h4 className="font-bold">Response:</h4>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-sm overflow-auto max-h-40">
            {response}
          </pre>
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

export default HttpNode;