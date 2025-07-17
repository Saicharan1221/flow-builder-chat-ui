import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';
import { useChatbotBuilder } from '../../contexts/ChatbotBuilderContext';

const MessageNode: React.FC<NodeProps> = ({ id, data, selected }) => {
  const { onNodeSelect } = useChatbotBuilder();

  const handleNodeClick = () => {
    onNodeSelect(id);
  };

  const nodeData = data as { text: string; nodeType: string };

  return (
    <div 
      className={`
        relative min-w-[200px] max-w-[300px] p-4 bg-node-bg border-2 rounded-lg shadow-lg cursor-pointer
        ${selected ? 'border-node-selected shadow-xl' : 'border-node-border hover:shadow-xl'}
        transition-all duration-200
      `}
      onClick={handleNodeClick}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-handle-bg border-2 border-white rounded-full"
      />
      
      {/* Node Content */}
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <MessageSquare size={16} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-foreground mb-1">Message</div>
          <div className="text-sm text-muted-foreground break-words">
            {nodeData?.text || 'Enter your message...'}
          </div>
        </div>
      </div>

      {/* Source Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-handle-bg border-2 border-white rounded-full"
      />
    </div>
  );
};

export default memo(MessageNode);