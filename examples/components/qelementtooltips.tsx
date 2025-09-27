/**
 * 👶 CHILD FILE - QELEMENTTOOLTIPS.TSX
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 👶 THIS IS A CHILD FILE - Inherits from parent styles
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * This file uses the 'card_container' parent from main-parents.tsx
 * Perfect for tooltips, modals, info cards, etc.
 * 
 * 🏗️ PARENT: card_container (defined in styles/main-parents.tsx)
 * 👶 CHILD: This component inherits from card_container parent
 */

import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const QElementTooltips = () => {
  // 🎯 This child inherits from 'card_container' parent
  const { override } = useQElementStyle('card_container');

  const handleTooltipStyle = () => {
    // 🎨 Custom tooltip styling
    override({
      backgroundColor: '#fff3cd',
      border: '1px solid #ffeaa7',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)',
      transform: 'scale(1.05)'
    });
  };

  const handleInfoStyle = () => {
    // 🎨 Info card styling
    override({
      backgroundColor: '#d1ecf1',
      border: '1px solid #bee5eb',
      borderRadius: 8,
      boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)'
    });
  };

  return (
    <QElementComponent elementId="card_container">
      <div style={{ padding: 20 }}>
        <h3>QElement Tooltips Component</h3>
        <p>This inherits from 'card_container' parent</p>
        <p>Perfect for tooltips, modals, and info cards!</p>
        
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button 
            onClick={handleTooltipStyle}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ffc107',
              color: '#212529',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Tooltip Style
          </button>
          
          <button 
            onClick={handleInfoStyle}
            style={{
              padding: '8px 16px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Info Card Style
          </button>
        </div>
      </div>
    </QElementComponent>
  );
};

export default QElementTooltips;
