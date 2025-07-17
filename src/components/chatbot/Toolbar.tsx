import React from 'react';
import { Save, AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { useChatbotBuilder } from '../../contexts/ChatbotBuilderContext';

export const Toolbar: React.FC = () => {
  const { validationErrors, saveFlow, clearErrors } = useChatbotBuilder();

  const hasErrors = validationErrors.some(error => error.type === 'error');
  const hasWarnings = validationErrors.some(error => error.type === 'warning');

  return (
    <div className="h-16 bg-toolbar-bg border-b border-panel-border px-6 flex items-center justify-between">
      {/* Left side - Title */}
      <div>
        <h1 className="text-xl font-bold text-foreground">Chatbot Flow Builder</h1>
        <p className="text-sm text-muted-foreground">Design your conversation flow</p>
      </div>

      {/* Center - Validation Messages */}
      <div className="flex-1 max-w-md mx-8">
        {validationErrors.length > 0 && (
          <Alert className={`${hasErrors ? 'border-error bg-error/10' : 'border-warning bg-warning/10'}`}>
            {hasErrors ? (
              <AlertCircle className="h-4 w-4 text-error" />
            ) : (
              <CheckCircle className="h-4 w-4 text-success" />
            )}
            <AlertDescription className={hasErrors ? 'text-error' : hasWarnings ? 'text-warning' : 'text-success'}>
              {validationErrors[0].message}
            </AlertDescription>
          </Alert>
        )}
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center space-x-3">
        {validationErrors.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearErrors}
          >
            <RotateCcw size={16} className="mr-2" />
            Clear
          </Button>
        )}
        
        <Button
          onClick={saveFlow}
          className="bg-primary hover:bg-primary/90"
          disabled={hasErrors}
        >
          <Save size={16} className="mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};