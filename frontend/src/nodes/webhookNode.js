// webhookNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const WebhookNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://');

  return (
    <BaseNode
      id={id}
      label="Webhook"
      leftHandles={[{ id: 'payload' }]}
      rightHandles={[{ id: 'response' }]}
    >
      <label>
        URL:
        <input
          type="text"
          value={url}
          placeholder="https://example.com/hook"
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
    </BaseNode>
  );
};
