import { Node, Edge } from '@xyflow/react';

export interface MessageNodeData extends Record<string, unknown> {
  text: string;
  nodeType: 'message';
}

export interface ChatbotNode extends Node<MessageNodeData> {
  type: 'message';
}

export interface ChatbotEdge extends Edge {
  // Add custom edge properties if needed
}

export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
}

export interface ChatbotFlow {
  nodes: ChatbotNode[];
  edges: ChatbotEdge[];
}

export interface NodeType {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<any>;
  defaultData: any;
  color: string;
}