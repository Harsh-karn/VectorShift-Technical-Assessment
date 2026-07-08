// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      label="LLM"
      leftHandles={[
        { id: 'system', top: `${100/3}%` },
        { id: 'prompt', top: `${200/3}%` }
      ]}
      rightHandles={[{ id: 'response' }]}
    >
      <div>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
