/**
 * 📊 DASHBOARD.TSX - CHILD FILE
 * 
 * This file uses multiple parents from main-parents.tsx:
 * - dashboard_layout (main layout)
 * - sidebar (navigation)
 * - content_area (main content)
 * - card_container (for dashboard cards)
 */

import React from 'react';
import { QElementComponent, useQElementStyle } from '../../src/QElementComponent';

const Dashboard = () => {
  // 🎯 Multiple parent inheritance
  const { override: overrideLayout } = useQElementStyle('dashboard_layout');
  const { override: overrideSidebar } = useQElementStyle('sidebar');
  const { override: overrideContent } = useQElementStyle('content_area');

  const handleDarkMode = () => {
    // 🌙 Dark mode for entire dashboard
    overrideLayout({
      backgroundColor: '#1a1a1a',
      color: '#ffffff'
    });
    
    overrideSidebar({
      backgroundColor: '#2c2c2c',
      color: '#ffffff'
    });
    
    overrideContent({
      backgroundColor: '#2c2c2c',
      color: '#ffffff'
    });
  };

  const handleLightMode = () => {
    // ☀️ Light mode for entire dashboard
    overrideLayout({
      backgroundColor: '#f8f9fa',
      color: '#333333'
    });
    
    overrideSidebar({
      backgroundColor: '#2c3e50',
      color: '#ecf0f1'
    });
    
    overrideContent({
      backgroundColor: '#ffffff',
      color: '#333333'
    });
  };

  return (
    <QElementComponent elementId="dashboard_layout">
      {/* Sidebar */}
      <QElementComponent elementId="sidebar">
        <div>
          <h3>Navigation</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ margin: '10px 0' }}>📊 Dashboard</li>
            <li style={{ margin: '10px 0' }}>📈 Analytics</li>
            <li style={{ margin: '10px 0' }}>⚙️ Settings</li>
          </ul>
          
          <div style={{ marginTop: 20 }}>
            <button 
              onClick={handleDarkMode}
              style={{
                padding: '6px 12px',
                backgroundColor: '#34495e',
                color: 'white',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                marginRight: 5
              }}
            >
              🌙 Dark
            </button>
            
            <button 
              onClick={handleLightMode}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ecf0f1',
                color: '#2c3e50',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              ☀️ Light
            </button>
          </div>
        </div>
      </QElementComponent>

      {/* Main Content */}
      <QElementComponent elementId="content_area">
        <div>
          <h1>Dashboard Content</h1>
          <p>This inherits from multiple parents!</p>
          
          {/* Dashboard Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 20 }}>
            <QElementComponent elementId="card_container">
              <div style={{ textAlign: 'center' }}>
                <h4>📊 Stats</h4>
                <p>1,234</p>
              </div>
            </QElementComponent>
            
            <QElementComponent elementId="card_container">
              <div style={{ textAlign: 'center' }}>
                <h4>📈 Growth</h4>
                <p>+12%</p>
              </div>
            </QElementComponent>
            
            <QElementComponent elementId="card_container">
              <div style={{ textAlign: 'center' }}>
                <h4>👥 Users</h4>
                <p>5,678</p>
              </div>
            </QElementComponent>
          </div>
        </div>
      </QElementComponent>
    </QElementComponent>
  );
};

export default Dashboard;
