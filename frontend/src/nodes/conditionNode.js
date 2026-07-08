// conditionNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || '==');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      label="Condition"
      leftHandles={[{ id: 'input' }]}
      rightHandles={[{ id: 'true', top: '33%' }, { id: 'false', top: '66%' }]}
    >
      <div style={{ display: 'flex', gap: '6px' }}>
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{ width: '40%' }}
        >
          <option value="==">==</option>
          <option value="!=">!=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
        </select>
        <input
          type="text"
          value={value}
          placeholder="Value"
          onChange={(e) => setValue(e.target.value)}
          style={{ width: '60%' }}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8b949e', paddingRight: '4px' }}>
        <span>→ True</span>
        <span>→ False</span>
      </div>
    </BaseNode>
  );
};
