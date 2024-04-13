import React from 'react';

const DummyButton: React.FC = () => {
  const handleClick = () => {
    throw new Error("This is a dummy error thrown by the DummyButton component.");
  };

  return (
    <button onClick={handleClick}>
      Click me to throw an error
    </button>
  );
};

export default DummyButton;
