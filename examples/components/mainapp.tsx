/**
 * 🏠 MAINAPP.TSX - CHILD FILE
 * 
 * This file also uses the 'main_container' parent from main-parents.tsx
 * It will inherit the same styles as app.tsx, but can have its own overrides
 */

import React from 'react';
import { QElementComponent, useQElementStyle } from '../../src/QElementComponent';

const MainApp = () => {
  // 🎯 This child also inherits from 'main_container' parent
  const { override } = useQElementStyle('main_container');

  const handleCustomStyling = () => {
    // 🎨 This child can have different overrides than app.tsx
    override({
      backgroundColor: '#ff9ff3',  // Pink background for this child
      border: '3px solid #ff6b6b',
      borderRadius: 20,
      boxShadow: '0 4px 8px rgba(255, 107, 107, 0.3)'
    });
  };

  return (
    <QElementComponent elementId="main_container">
      <div style={{ textAlign: 'center' }}>
        <h2>Main App Component</h2>
        <p>This also inherits from 'main_container' parent</p>
        <p>It can have different styling than app.tsx!</p>
        
        <button 
          onClick={handleCustomStyling}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            marginTop: 15
          }}
        >
          Custom Pink Styling
        </button>
      </div>
    </QElementComponent>
  );
};

export default MainApp;
