import React, { createContext, useContext, useState, useCallback } from 'react';
import { Node, Edge, useNodesState, useEdgesState, addEdge, Connection } from '@xyflow/react';
import { ValidationError } from '../types/chatbot';

interface ChatbotBuilderContextType {
  nodes: Node[];
  edges: Edge[];
  selectedNodeId: string | null;
  validationErrors: ValidationError[];
  onNodesChange: (changes: any) => void;
  onEdgesChange: (changes: any) => void;
  onConnect: (connection: Connection) => void;
  onNodeSelect: (nodeId: string | null) => void;
  updateNodeText: (nodeId: string, text: string) => void;
  addNode: (type: string, position: { x: number; y: number }) => void;
  validateFlow: () => ValidationError[];
  saveFlow: () => void;
  clearErrors: () => void;
}

const ChatbotBuilderContext = createContext<ChatbotBuilderContextType | null>(null);

export const useChatbotBuilder = () => {
  const context = useContext(ChatbotBuilderContext);
  if (!context) {
    throw new Error('useChatbotBuilder must be used within ChatbotBuilderProvider');
  }
  return context;
};

const initialNodes: Node[] = [
  {
    id: 'start-1',
    type: 'message',
    position: { x: 250, y: 50 },
    data: { text: 'Welcome! How can I help you?', nodeType: 'message' },
  },
];

const initialEdges: Edge[] = [];

export const ChatbotBuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  const onConnect = useCallback((params: Connection) => {
    // Check if source handle already has an outgoing edge
    const sourceHasEdge = edges.some(
      edge => edge.source === params.source && edge.sourceHandle === params.sourceHandle
    );
    
    if (sourceHasEdge) {
      setValidationErrors([{ 
        type: 'warning', 
        message: 'Each output can only have one connection. Please remove the existing connection first.' 
      }]);
      return;
    }

    setEdges((eds) => addEdge(params, eds));
    clearErrors();
  }, [edges, setEdges]);

  const onNodeSelect = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const updateNodeText = useCallback((nodeId: string, text: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, text } }
          : node
      )
    );
  }, [setNodes]);

  const addNode = useCallback((type: string, position: { x: number; y: number }) => {
    const newNode: Node = {
      id: `${type}-${Date.now()}`,
      type: 'message',
      position,
      data: { text: 'New message', nodeType: 'message' },
    };
    setNodes((nds) => [...nds, newNode]);
  }, [setNodes]);

  const validateFlow = useCallback((): ValidationError[] => {
    const errors: ValidationError[] = [];
    
    if (nodes.length > 1) {
      // Find nodes with no incoming connections
      const nodesWithoutIncoming = nodes.filter(node => 
        !edges.some(edge => edge.target === node.id)
      );
      
      if (nodesWithoutIncoming.length > 1) {
        errors.push({
          type: 'error',
          message: `Found ${nodesWithoutIncoming.length} nodes without incoming connections. Only one start node is allowed.`
        });
      }
    }
    
    return errors;
  }, [nodes, edges]);

  const saveFlow = useCallback(() => {
    const errors = validateFlow();
    setValidationErrors(errors);
    
    if (errors.filter(e => e.type === 'error').length === 0) {
      // Save the flow (localStorage for now)
      const flowData = { nodes, edges };
      localStorage.setItem('chatbot-flow', JSON.stringify(flowData));
      
      setValidationErrors([{
        type: 'warning',
        message: 'Flow saved successfully!'
      }]);
      
      // Clear success message after 3 seconds
      setTimeout(() => setValidationErrors([]), 3000);
    }
  }, [nodes, edges, validateFlow]);

  const clearErrors = useCallback(() => {
    setValidationErrors([]);
  }, []);

  return (
    <ChatbotBuilderContext.Provider
      value={{
        nodes,
        edges,
        selectedNodeId,
        validationErrors,
        onNodesChange,
        onEdgesChange,
        onConnect,
        onNodeSelect,
        updateNodeText,
        addNode,
        validateFlow,
        saveFlow,
        clearErrors,
      }}
    >
      {children}
    </ChatbotBuilderContext.Provider>
  );
};