import React from 'react';
import { Handle, Position } from 'reactflow';

export function BaseNode({ id, label, children, leftHandles = [], rightHandles = [], style }) {
  // calculate equal spacing for the handles so they don't look weirdly bunched up
  return (
    <div className="node-container" style={style}>
      {leftHandles.map((handle, index) => {
        const topPos = handle.top || `${((index + 1) * 100) / (leftHandles.length + 1)}%`;
        return (
          <Handle
            key={`${id}-${handle.id}-left`}
            type="target"
            position={Position.Left}
            id={`${id}-${handle.id}`}
            style={{ top: topPos }}
          />
        );
      })}
      
      <div className="node-header">{label}</div>
      <div className="node-content">{children}</div>

      {rightHandles.map((handle, index) => {
        const topPos = handle.top || `${((index + 1) * 100) / (rightHandles.length + 1)}%`;
        return (
          <Handle
            key={`${id}-${handle.id}-right`}
            type="source"
            position={Position.Right}
            id={`${id}-${handle.id}`}
            style={{ top: topPos }}
          />
        );
      })}
    </div>
  );
}
