import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageSquare, Save } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useChatbotBuilder } from '../../contexts/ChatbotBuilderContext';

interface SettingsPanelProps {
  onBack: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onBack }) => {
  const { nodes, selectedNodeId, updateNodeText } = useChatbotBuilder();
  const [messageText, setMessageText] = useState('');

  const selectedNode = nodes.find(node => node.id === selectedNodeId);

  useEffect(() => {
    if (selectedNode) {
      const nodeData = selectedNode.data as { text: string; nodeType: string };
      setMessageText(nodeData?.text || '');
    }
  }, [selectedNode]);

  const handleTextChange = (value: string) => {
    setMessageText(value);
    if (selectedNodeId) {
      updateNodeText(selectedNodeId, value);
    }
  };

  if (!selectedNode) {
    return (
      <div className="w-80 bg-panel-bg border-l border-panel-border p-6 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
          <p>No node selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-panel-bg border-l border-panel-border p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2"
        >
          <ArrowLeft size={16} />
        </Button>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Node Settings</h2>
          <p className="text-sm text-muted-foreground">Message Node</p>
        </div>
      </div>

      {/* Node Info */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Message Node</h3>
            <p className="text-xs text-muted-foreground">ID: {selectedNode.id}</p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="message-text" className="text-sm font-medium">
            Message Text
          </Label>
          <Textarea
            id="message-text"
            value={messageText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message..."
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-muted-foreground">
            This message will be displayed to users when they reach this node.
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Node ID</Label>
          <Input
            value={selectedNode.id}
            disabled
            className="bg-muted"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Position</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              value={Math.round(selectedNode.position.x)}
              disabled
              className="bg-muted"
              placeholder="X"
            />
            <Input
              value={Math.round(selectedNode.position.y)}
              disabled
              className="bg-muted"
              placeholder="Y"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <Button
          onClick={onBack}
          variant="outline"
          className="w-full"
        >
          <Save size={16} className="mr-2" />
          Done Editing
        </Button>
      </div>
    </div>
  );
};