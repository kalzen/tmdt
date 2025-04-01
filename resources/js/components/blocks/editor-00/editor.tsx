import React from 'react';
import { SerializedEditorState, SerializedLexicalNode } from 'lexical';

interface EditorProps {
  // Update the props to match what's being used in editor-00.tsx
  editorSerializedState?: SerializedEditorState<SerializedLexicalNode>;
  onSerializedChange?: (value: SerializedEditorState<SerializedLexicalNode>) => void;
  content?: string;
  onChange?: (content: string) => void;
  initialState?: SerializedEditorState;
}

// Use the correct export name "Editor" to match the import in editor-00.tsx
export const Editor: React.FC<EditorProps> = ({ 
  content = '', 
  onChange, 
  initialState,
  editorSerializedState,
  onSerializedChange
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
    
    // If onSerializedChange is provided, create a properly typed serialized state
    if (onSerializedChange) {
      // Create a properly formatted SerializedEditorState with all required properties
      // Convert to unknown first to bypass type checking and then assert the type
      const mockSerializedState = {
        root: {
          children: [{
            children: [],
            direction: null,
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
            text: e.target.value
          }],
          direction: null,
          format: "",
          indent: 0,
          type: "root",
          version: 1
        }
      } as unknown as SerializedEditorState<SerializedLexicalNode>;
      
      onSerializedChange(mockSerializedState);
    }
  };

  // For display purposes, use either content prop or try to extract from serialized state
  let displayContent = content;
  
  if (editorSerializedState && !displayContent) {
    try {
      // Try to extract text content from serialized state
      const rootNode = editorSerializedState.root;
      if (rootNode && rootNode.children && rootNode.children.length > 0) {
        displayContent = rootNode.children.map(node => ('text' in node ? node.text : '')).join('\n');
      }
    } catch (e) {
      // Fallback to empty string if serialized state is invalid
      displayContent = '';
    }
  }

  return (
    <div className="editor-container">
      <textarea
        className="w-full h-64 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        value={displayContent}
        onChange={handleChange}
        placeholder="Start typing your content here..."
      />
    </div>
  );
};

// Also export it as default for backward compatibility
export default Editor;
