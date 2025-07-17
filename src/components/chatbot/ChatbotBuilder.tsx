import React, { useState, useCallback } from 'react';
import { ChatbotCanvas } from './ChatbotCanvas';
import { NodesPanel } from './NodesPanel';
import { SettingsPanel } from './SettingsPanel';
import { Toolbar } from './Toolbar';
import { ChatbotBuilderProvider } from '../../contexts/ChatbotBuilderContext';

export const ChatbotBuilder: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);

  const onDragStart = useCallback((event: React.DragEvent, nodeType: string) => {
    setDraggedNodeType(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  }, []);

  const onNodeSelect = useCallback((nodeId: string | null) => {
    setSelectedNodeId(nodeId);
  }, []);

  const onBackToNodes = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  return (
    <ChatbotBuilderProvider>
      <div className="h-screen flex flex-col bg-background">
        {/* Toolbar */}
        <Toolbar />
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas */}
          <ChatbotCanvas onNodeSelect={onNodeSelect} />
          
          {/* Right Panel */}
          {selectedNodeId ? (
            <SettingsPanel onBack={onBackToNodes} />
          ) : (
            <NodesPanel onDragStart={onDragStart} />
          )}
        </div>
      </div>
    </ChatbotBuilderProvider>
  );
};