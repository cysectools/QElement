import React from 'react';
import { QElementComponent, useQElementStyle } from '../src';

// Child component that uses the same element ID
const BadgesScreenExample: React.FC = () => {
  const { override, reset, getComputed } = useQElementStyle('main_container_element');

  const handleOverrideChild = () => {
    // This will only affect THIS specific child
    override({
      padding: 30,
      margin: 15,
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3'
    });
  };

  const handleResetChild = () => {
    // Reset to parent values
    reset();
  };

  const handleShowComputed = () => {
    const computed = getComputed();
    console.log('Computed styles for this child:', computed);
    alert(`Computed styles: ${JSON.stringify(computed, null, 2)}`);
  };

  return (
    <div>
      <h2>Badges Screen Child Component</h2>
      <p>This component uses the same "main_container_element" ID as the parent</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={handleOverrideChild}>
          Override Child Style (only affects this child)
        </button>
        <button onClick={handleResetChild} style={{ marginLeft: '10px' }}>
          Reset to Parent Style
        </button>
        <button onClick={handleShowComputed} style={{ marginLeft: '10px' }}>
          Show Computed Styles
        </button>
      </div>

      {/* This child inherits from parent but can override */}
      <QElementComponent 
        elementId="main_container_element"
        style={{ border: '2px dashed #666' }}
      >
        <p>This is a child container that inherits from the parent.</p>
        <p>It starts with the same styles as the parent but can override them.</p>
        <p>Current child styles: inherits parent + any overrides</p>
      </QElementComponent>

      {/* Another child to show inheritance */}
      <QElementComponent 
        elementId="main_container_element"
        style={{ marginTop: '20px', border: '2px dotted #999' }}
      >
        <p>This is another child container.</p>
        <p>It also inherits from the parent but is independent from the first child.</p>
      </QElementComponent>
    </div>
  );
};

export default BadgesScreenExample;
