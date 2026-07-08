// transformNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transform, setTransform] = useState(data?.transform || 'Uppercase');

  return (
    <BaseNode
      id={id}
      label="Transform"
      leftHandles={[{ id: 'input' }]}
      rightHandles={[{ id: 'output' }]}
    >
      <label>
        Operation:
        <select value={transform} onChange={(e) => setTransform(e.target.value)}>
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim</option>
          <option value="Reverse">Reverse</option>
        </select>
      </label>
    </BaseNode>
  );
};
