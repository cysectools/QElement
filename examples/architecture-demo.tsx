/**
 * 🎯 ARCHITECTURE DEMO
 * 
 * This file demonstrates the complete parent-child architecture:
 * 1. Import and initialize parents from main-parents.tsx
 * 2. Use child components that inherit from parents
 * 3. Show how changing parents affects all children
 */

import React, { useState } from 'react';
import { QElementProvider } from '../src/QElementProvider';

// Import parent styles (this initializes all parents)
import './styles/main-parents';

// Import child components
import App from './components/app';
import MainApp from './components/mainapp';
import QElementTooltips from './components/qelementtooltips';
import Dashboard from './components/dashboard';

const ArchitectureDemo = () => {
  const [currentView, setCurrentView] = useState('app');

  const renderCurrentView = () => {
    switch (currentView) {
      case 'app':
        return <App />;
      case 'mainapp':
        return <MainApp />;
      case 'tooltips':
        return <QElementTooltips />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <App />;
    }
  };

  return (
    <QElementProvider>
      <div style={{ 
        padding: 20, 
        backgroundColor: '#f8f9fa', 
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#2c3e50' }}>
          🎯 QElements Parent-Child Architecture Demo
        </h1>
        
        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: 20, 
          borderRadius: 8, 
          marginBottom: 20,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>📁 File Structure</h2>
          <pre style={{ 
            backgroundColor: '#f8f9fa', 
            padding: 15, 
            borderRadius: 4,
            overflow: 'auto',
            fontSize: '14px'
          }}>
{`src/
├── styles/
│   └── main-parents.tsx          # 🎯 ALL PARENT STYLES
├── components/
│   ├── app.tsx                   # Child using main_container
│   ├── mainapp.tsx              # Child using main_container  
│   ├── qelementtooltips.tsx     # Child using card_container
│   └── dashboard.tsx            # Child using dashboard_layout
`}
          </pre>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: 20, 
          borderRadius: 8, 
          marginBottom: 20,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>🎮 Navigation</h2>
          <p>Switch between different child components to see parent inheritance:</p>
          
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            <button 
              onClick={() => setCurrentView('app')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentView === 'app' ? '#007acc' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              📱 App.tsx
            </button>
            
            <button 
              onClick={() => setCurrentView('mainapp')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentView === 'mainapp' ? '#007acc' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              🏠 MainApp.tsx
            </button>
            
            <button 
              onClick={() => setCurrentView('tooltips')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentView === 'tooltips' ? '#007acc' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              💡 QElementTooltips.tsx
            </button>
            
            <button 
              onClick={() => setCurrentView('dashboard')}
              style={{
                padding: '10px 20px',
                backgroundColor: currentView === 'dashboard' ? '#007acc' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              📊 Dashboard.tsx
            </button>
          </div>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: 20, 
          borderRadius: 8, 
          marginBottom: 20,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>🎯 How It Works</h2>
          <ol style={{ lineHeight: 1.6 }}>
            <li><strong>Parent Definition:</strong> All styles defined in <code>main-parents.tsx</code></li>
            <li><strong>Child Inheritance:</strong> Components use <code>QElementComponent</code> with parent IDs</li>
            <li><strong>Global Changes:</strong> Change parent in <code>main-parents.tsx</code> → affects all children</li>
            <li><strong>Individual Overrides:</strong> Children can override specific styles using <code>useQElementStyle</code></li>
            <li><strong>No File Searching:</strong> One place to change all related components!</li>
          </ol>
        </div>

        <div style={{ 
          backgroundColor: '#ffffff', 
          padding: 20, 
          borderRadius: 8, 
          marginBottom: 20,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>🧪 Try It Out</h2>
          <p>Click the buttons in the components below to see:</p>
          <ul style={{ lineHeight: 1.6 }}>
            <li>✅ <strong>Parent Inheritance:</strong> All components inherit from their parents</li>
            <li>✅ <strong>Individual Overrides:</strong> Each child can have unique styling</li>
            <li>✅ <strong>Reset Functionality:</strong> Reset to parent styles anytime</li>
            <li>✅ <strong>Multiple Parents:</strong> Dashboard uses multiple parent types</li>
          </ul>
        </div>

        {/* Render the current child component */}
        <div style={{ 
          border: '2px solid #007acc', 
          borderRadius: 8, 
          padding: 20,
          backgroundColor: '#f8f9ff'
        }}>
          <h3 style={{ marginTop: 0, color: '#007acc' }}>
            Current Component: {currentView}.tsx
          </h3>
          {renderCurrentView()}
        </div>

        <div style={{ 
          backgroundColor: '#e8f5e8', 
          padding: 20, 
          borderRadius: 8, 
          marginTop: 20,
          border: '1px solid #4caf50'
        }}>
          <h3 style={{ marginTop: 0, color: '#2e7d32' }}>🎉 Perfect Architecture!</h3>
          <p>This is exactly what you envisioned:</p>
          <ul style={{ lineHeight: 1.6 }}>
            <li>✅ <strong>One main file</strong> with all parent styles</li>
            <li>✅ <strong>Multiple child files</strong> that inherit from parents</li>
            <li>✅ <strong>Change parent = change all children</strong></li>
            <li>✅ <strong>Individual child overrides</strong> when needed</li>
            <li>✅ <strong>No file searching</strong> required for global changes</li>
          </ul>
        </div>
      </div>
    </QElementProvider>
  );
};

export default ArchitectureDemo;
