import { useState, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';

export function TextNode({ id, data }) {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    // Extract variables wrapped in {{varName}} syntax
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = new Set();
    let match;
    while ((match = regex.exec(currText)) !== null) {
      matches.add(match[1]);
    }
    setVariables(Array.from(matches));

    // Dynamically resize the textarea to fit its content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      
      // Estimate width based on the longest line
      const lines = currText.split('\n');
      const maxLen = Math.max(...lines.map(l => l.length));
      const calcWidth = Math.max(200, Math.min(600, maxLen * 8 + 40));
      textareaRef.current.style.width = `${calcWidth}px`;
    }
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      label="Text"
      leftHandles={variables.map(v => ({ id: v }))}
      rightHandles={[{ id: 'output' }]}
    >
      <label>
        Text:
        <textarea 
          ref={textareaRef}
          value={currText} 
          onChange={handleTextChange} 
          style={{ overflow: 'hidden' }}
        />
      </label>
    </BaseNode>
  );
}
