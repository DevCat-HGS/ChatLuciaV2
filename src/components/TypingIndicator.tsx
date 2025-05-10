import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex space-x-1 items-center h-6">
      <div className="dot-typing">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    </div>
  );
};

export default TypingIndicator;