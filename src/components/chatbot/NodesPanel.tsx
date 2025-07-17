import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import { NodeType } from '../../types/chatbot';

interface NodesPanelProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

const nodeTypes: NodeType[] = [
  {
    id: 'message',
    label: 'Message',
    description: 'Send a text message to the user',
    icon: MessageSquare,
    defaultData: { text: 'New message', nodeType: 'message' },
    color: 'bg-primary',
  },
  // Future node types can be added here
  // {
  //   id: 'image',
  //   label: 'Image',
  //   description: 'Send an image to the user',
  //   icon: ImageIcon,
  //   defaultData: { imageUrl: '', alt: '', nodeType: 'image' },
  //   color: 'bg-green-500',
  // },
];

export const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  return (
    <div className="w-80 bg-panel-bg border-l border-panel-border p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-2">Nodes</h2>
        <p className="text-sm text-muted-foreground">
          Drag nodes onto the canvas to build your chatbot flow
        </p>
      </div>

      <div className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.id}
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.id)}
            className="group p-4 bg-card border border-border rounded-lg cursor-grab hover:border-primary hover:shadow-md transition-all duration-200 active:cursor-grabbing"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${nodeType.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <nodeType.icon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{nodeType.label}</h3>
                <p className="text-xs text-muted-foreground">{nodeType.description}</p>
              </div>
              <Plus size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-foreground mb-2">Coming Soon</h3>
        <p className="text-xs text-muted-foreground">
          More node types like Images, Quick Replies, and API Calls will be available soon.
        </p>
      </div>
    </div>
  );
};