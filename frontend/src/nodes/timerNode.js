// timerNode.js
import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const TimerNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);

  return (
    <BaseNode
      id={id}
      label="Timer"
      leftHandles={[{ id: 'trigger' }]}
      rightHandles={[{ id: 'done' }]}
    >
      <label>
        Delay (ms):
        <input
          type="number"
          value={delay}
          min={0}
          onChange={(e) => setDelay(parseInt(e.target.value) || 0)}
        />
      </label>
    </BaseNode>
  );
};
