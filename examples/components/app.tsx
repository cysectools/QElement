/**
 * 👶 CHILD FILE - APP.TSX
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 👶 THIS IS A CHILD FILE - Inherits from parent styles
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file uses the 'main_container' parent from main-parents.tsx
 * Any changes to main_container in the parent file will affect this component
 * 
 * 🏗️ PARENT: main_container (defined in styles/main-parents.tsx)
 * 👶 CHILD: This component inherits from main_container parent
 */

import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const App = () => {
  // 🎯 This child inherits from 'main_container' parent
  const { override, reset } = useQElementStyle('main_container');

  const handleSpecialStyling = () => {
    // 🎨 Override only this child's styling
    override({
      backgroundColor: '#4ecdc4',  // Teal background for this child only
      border: '2px dashed #4ecdc4',
      transform: 'scale(1.02)'
    });
  };

  const handleReset = () => {
    // 🔄 Reset to parent styling
    reset();
  };

  return (
    <QElementComponent elementId="main_container">
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to App.tsx</h1>
        <p>This component inherits from the 'main_container' parent</p>
        <p>Change the parent style in main-parents.tsx to see global changes!</p>
        
        <div style={{ marginTop: 20, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button 
            onClick={handleSpecialStyling}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4ecdc4',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Make This Child Special
          </button>
          
          <button 
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Reset to Parent
          </button>
        </div>
      </div>
    </QElementComponent>
  );
};

export default App;
