import React from 'react';
import { useFlowStore } from '../store/flowStore';
import { FileText, Globe, FormInput, StickyNote, Database, ShoppingCart, Briefcase, Webhook } from 'lucide-react';

const Toolbar = () => {
  const { addNode, addTemplate } = useFlowStore();

  const tools = [
    { name: 'Simple Node', icon: FileText, action: () => addNode('simpleNode') },
    { name: 'HTTP Node', icon: Globe, action: () => addNode('httpNode') },
    { name: 'Form Node', icon: FormInput, action: () => addNode('formNode') },
    { name: 'Comment', icon: StickyNote, action: () => addNode('commentNode') },
    { name: 'Database', icon: Database, action: () => addNode('databaseNode') },
    { name: 'Webhook', icon: Webhook, action: () => addNode('webhookNode') },
    { name: 'E-commerce Template', icon: ShoppingCart, action: () => addTemplate('ecommerce') },
    { name: 'Digital Agency Template', icon: Briefcase, action: () => addTemplate('digitalAgency') },
  ];

  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col space-y-4">
      <h2 className="text-xl font-bold mb-4">Toolbar</h2>
      {tools.map((tool) => (
        <button
          key={tool.name}
          onClick={tool.action}
          className="flex items-center space-x-2 bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          <tool.icon size={20} />
          <span>{tool.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Toolbar;