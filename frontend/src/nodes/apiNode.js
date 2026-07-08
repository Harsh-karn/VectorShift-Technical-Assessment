// apiNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [endpoint, setEndpoint] = useState(data?.endpoint || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      label="API Request"
      leftHandles={[{ id: 'trigger', top: '33%' }, { id: 'body', top: '66%' }]}
      rightHandles={[{ id: 'response' }]}
    >
      <label>
        Method:
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </label>
      <label>
        Endpoint:
        <input
          type="text"
          value={endpoint}
          placeholder="https://api.example.com/..."
          onChange={(e) => setEndpoint(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
