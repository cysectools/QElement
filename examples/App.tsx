import React from 'react';
import { QElementProvider } from '../src';
import MainExample from './main_example';
import BadgesScreenExample from './badges_screen_example';

const App: React.FC = () => {
  return (
    <QElementProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>QElements Demo</h1>
        <p>This demonstrates the parent-child relationship with style inheritance.</p>
        
        <div style={{ marginBottom: '40px' }}>
          <MainExample />
        </div>
        
        <div>
          <BadgesScreenExample />
        </div>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3>How it works:</h3>
          <ul>
            <li><strong>Parent Control:</strong> The main component controls the base styles for "main_container_element"</li>
            <li><strong>Child Inheritance:</strong> All children with the same elementId inherit the parent's styles</li>
            <li><strong>Child Override:</strong> Individual children can override specific properties without affecting others</li>
            <li><strong>Independent Children:</strong> Each child can have different overrides while sharing the same base</li>
          </ul>
        </div>
      </div>
    </QElementProvider>
  );
};

export default App;
