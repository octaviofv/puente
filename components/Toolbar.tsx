import React from 'react';
import { useFlowStore } from '../store/flowStore';
import { FileText, Globe, FormInput, StickyNote, Database, ShoppingCart, Briefcase, Webhook } from 'lucide-react';

const Toolbar = () => {
  const { addNode, addTemplate } = useFlowStore();

  const tools = [
    { name: 'Simple Node', icon: FileText, type: 'simpleNode' },
    { name: 'HTTP Node', icon: Globe, type: 'httpNode' },
    { name: 'Form Node', icon: FormInput, type: 'formNode' },
    { name: 'Comment', icon: StickyNote, type: 'commentNode' },
    { name: 'Database', icon: Database, type: 'databaseNode' },
    { name: 'Webhook', icon: Webhook, type: 'webhookNode' },
  ];

  const templates = [
    { name: 'E-commerce OS', icon: ShoppingCart, type: 'ecommerce' },
    { name: 'Digital Agency OS', icon: Briefcase, type: 'digitalAgency' },
  ];

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-4">Toolbar</h2>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-600">Nodes</h3>
        {tools.map((tool) => (
          <div
            key={tool.type}
            draggable
            onDragStart={(e) => onDragStart(e, tool.type)}
            className="flex items-center space-x-2 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-move"
          >
            <tool.icon size={20} />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-600">Templates</h3>
        {templates.map((template) => (
          <button
            key={template.type}
            onClick={() => addTemplate(template.type as 'ecommerce' | 'digitalAgency')}
            className="flex items-center space-x-2 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-full"
          >
            <template.icon size={20} />
            <span>{template.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;