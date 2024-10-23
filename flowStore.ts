import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  XYPosition,
} from 'reactflow';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string, position?: XYPosition) => void;
  removeNode: (id: string) => void;
  clearFlow: () => void;
  executeFlow: () => void;
  addTemplate: (type: 'ecommerce' | 'digitalAgency') => void;
};

let id = 0;
const getId = () => `${id++}`;

export const useFlowStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (type: string, position?: XYPosition) => {
    const newNode = {
      id: getId(),
      type,
      position: position || { x: Math.random() * 500, y: Math.random() * 500 },
      data: { label: `${type} node` },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  removeNode: (id: string) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== id),
      edges: get().edges.filter((edge) => edge.source !== id && edge.target !== id),
    });
  },
  clearFlow: () => {
    set({ nodes: [], edges: [] });
  },
  executeFlow: () => {
    console.log('Executing flow...');
  },
  addTemplate: (type: 'ecommerce' | 'digitalAgency') => {
    let templateNodes: Node[] = [];
    let templateEdges: Edge[] = [];

    if (type === 'ecommerce') {
      templateNodes = [
        { id: '1', type: 'simpleNode', position: { x: 250, y: 5 }, data: { label: 'Start', text: 'Start' } },
        { id: '2', type: 'simpleNode', position: { x: 250, y: 100 }, data: { label: 'Browse Products', text: 'Browse Products' } },
        { id: '3', type: 'simpleNode', position: { x: 250, y: 200 }, data: { label: 'Add to Cart', text: 'Add to Cart' } },
        { id: '13', type: 'formNode', position: { x: 250, y: 300 }, data: { label: 'Checkout Form', fields: [
          { id: '1', type: 'text', label: 'Full Name' },
          { id: '2', type: 'email', label: 'Email' },
          { id: '3', type: 'text', label: 'Shipping Address' },
          { id: '4', type: 'text', label: 'Payment Method' }
        ] } },
        { id: '4', type: 'simpleNode', position: { x: 250, y: 800 }, data: { label: 'Checkout', text: 'Checkout' } },
        { id: '5', type: 'simpleNode', position: { x: 250, y: 900 }, data: { label: 'Payment', text: 'Payment' } },
        { id: '6', type: 'simpleNode', position: { x: 250, y: 1400 }, data: { label: 'Order Confirmation', text: 'Order Confirmation' } },
        { id: '7', type: 'simpleNode', position: { x: 250, y: 1500 }, data: { label: 'End', text: 'End' } },
        { id: '14', type: 'commentNode', position: { x: 600, y: 400 }, data: { comment: 'Ejemplo de como quedaría un flujo de ecommerce OS' } },
        { id: '15', type: 'databaseNode', position: { x: 600, y: 100 }, data: { label: 'Product Database' } },
        { id: '16', type: 'httpNode', position: { x: 250, y: 1000 }, data: { label: 'API: Process Payment', url: '/api/payment', method: 'POST' } },
      ];
      templateEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-13', source: '3', target: '13' },
        { id: 'e13-4', source: '13', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e16-6', source: '16', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
        { id: 'e4-15', source: '3', target: '15' },
        { id: 'e6-15', source: '6', target: '15' },
        { id: 'e5-16', source: '5', target: '16' },
      ];
    } else if (type === 'digitalAgency') {
      templateNodes = [
        { id: '1', type: 'simpleNode', position: { x: 250, y: 5 }, data: { label: 'Lead Generation', text: 'Lead Generation' } },
        { id: '2', type: 'simpleNode', position: { x: 250, y: 100 }, data: { label: 'Sales Consultation', text: 'Sales Consultation' } },
        { id: '3', type: 'simpleNode', position: { x: 250, y: 200 }, data: { label: 'Proposal', text: 'Proposal' } },
        { id: '4', type: 'simpleNode', position: { x: 250, y: 300 }, data: { label: 'Contract Signing', text: 'Contract Signing' } },
        { id: '5', type: 'simpleNode', position: { x: 250, y: 400 }, data: { label: 'Project Planning', text: 'Project Planning' } },
        { id: '6', type: 'simpleNode', position: { x: 250, y: 500 }, data: { label: 'Implementation', text: 'Implementation' } },
        { id: '7', type: 'simpleNode', position: { x: 250, y: 600 }, data: { label: 'Reporting & Optimization', text: 'Reporting & Optimization' } },
      ];
      templateEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
        { id: 'e6-7', source: '6', target: '7' },
      ];
    }

    set({
      nodes: [...get().nodes, ...templateNodes],
      edges: [...get().edges, ...templateEdges],
    });
  },
}));