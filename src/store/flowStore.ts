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
} from 'reactflow';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (type: string) => void;
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
  addNode: (type: string) => {
    const newNode = {
      id: getId(),
      type,
      position: { x: Math.random() * 500, y: Math.random() * 500 },
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
    // Implement flow execution logic here
  },
  addTemplate: (type: 'ecommerce' | 'digitalAgency') => {
    let templateNodes: Node[] = [];
    let templateEdges: Edge[] = [];

    if (type === 'ecommerce') {
      templateNodes = [
        { id: '1', type: 'simpleNode', position: { x: 250, y: 5 }, data: { label: 'Start' } },
        { id: '2', type: 'simpleNode', position: { x: 250, y: 100 }, data: { label: 'Browse Products' } },
        { id: '3', type: 'simpleNode', position: { x: 250, y: 200 }, data: { label: 'Add to Cart' } },
        { id: '4', type: 'simpleNode', position: { x: 250, y: 300 }, data: { label: 'Checkout' } },
        { id: '5', type: 'simpleNode', position: { x: 250, y: 400 }, data: { label: 'Payment' } },
        { id: '6', type: 'simpleNode', position: { x: 250, y: 500 }, data: { label: 'Order Confirmation' } },
      ];
      templateEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3' },
        { id: 'e3-4', source: '3', target: '4' },
        { id: 'e4-5', source: '4', target: '5' },
        { id: 'e5-6', source: '5', target: '6' },
      ];
    } else if (type === 'digitalAgency') {
      templateNodes = [
        { id: '1', type: 'simpleNode', position: { x: 250, y: 5 }, data: { label: 'Lead Generation' } },
        { id: '2', type: 'simpleNode', position: { x: 250, y: 100 }, data: { label: 'Sales Consultation' } },
        { id: '3', type: 'simpleNode', position: { x: 250, y: 200 }, data: { label: 'Proposal' } },
        { id: '4', type: 'simpleNode', position: { x: 250, y: 300 }, data: { label: 'Contract Signing' } },
        { id: '5', type: 'simpleNode', position: { x: 250, y: 400 }, data: { label: 'Project Planning' } },
        { id: '6', type: 'simpleNode', position: { x: 250, y: 500 }, data: { label: 'Implementation' } },
        { id: '7', type: 'simpleNode', position: { x: 250, y: 600 }, data: { label: 'Reporting & Optimization' } },
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