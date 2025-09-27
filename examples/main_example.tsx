import React from 'react';
import { QElementProvider, QElementComponent, useQElementStyle } from '../src';

// Main parent component
const MainExample: React.FC = () => {
  const { updateParent } = useQElementStyle('main_container_element');

  const handleUpdateParent = () => {
    // This will affect ALL children with the same element ID
    updateParent({
      padding: 20,
      margin: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8
    });
  };

  const handleResetParent = () => {
    updateParent({
      padding: 10,
      margin: 5,
      backgroundColor: 'transparent',
      borderRadius: 0
    });
  };

  return (
    <div>
      <h2>Main Parent Component</h2>
      <p>This component controls the parent "main_container_element"</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleUpdateParent}>
          Update Parent Style (affects all children)
        </button>
        <button onClick={handleResetParent} style={{ marginLeft: '10px' }}>
          Reset Parent Style
        </button>
      </div>

      {/* This is the parent element */}
      <QElementComponent 
        elementId="main_container_element"
        style={{ border: '2px solid #333', minHeight: '100px' }}
      >
        <p>This is the parent container. All children with the same elementId will inherit these styles.</p>
        <p>Current parent styles: padding: 10, margin: 5</p>
      </QElementComponent>
    </div>
  );
};

export default MainExample;
