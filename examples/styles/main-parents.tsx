/**
 * 🎯 MAIN PARENTS FILE
 * 
 * This file contains ALL parent styles for your entire application.
 * Change styles here to affect ALL children across your app.
 * 
 * File Structure:
 * - styles/main-parents.tsx (THIS FILE) - All parent definitions
 * - components/app.tsx - Child using main_container
 * - components/mainapp.tsx - Child using main_container  
 * - components/qelementtooltips.tsx - Child using card_container
 * - components/dashboard.tsx - Child using dashboard_layout
 */

import { QElement, QElementManager } from 'qelements';

// 🏗️ MAIN CONTAINER PARENT
// Used by: app.tsx, mainapp.tsx, and other main pages
const mainContainer = new QElement('main_container', {
  padding: 20,
  margin: 10,
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  border: '2px solid #007acc',
  fontFamily: 'Arial, sans-serif',
  color: '#333333'
});

// 🎴 CARD CONTAINER PARENT  
// Used by: qelementtooltips.tsx, modal components, info cards
const cardContainer = new QElement('card_container', {
  padding: 15,
  margin: 5,
  backgroundColor: '#ffffff',
  borderRadius: 6,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  border: '1px solid #e0e0e0'
});

// 🔘 BUTTON CONTAINER PARENT
// Used by: All button components across the app
const buttonContainer = new QElement('button_container', {
  padding: '10px 20px',
  margin: 5,
  backgroundColor: '#007acc',
  color: '#ffffff',
  borderRadius: 4,
  cursor: 'pointer',
  border: 'none',
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease'
});

// 📊 DASHBOARD LAYOUT PARENT
// Used by: dashboard.tsx, analytics pages, admin panels
const dashboardLayout = new QElement('dashboard_layout', {
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  backgroundColor: '#f8f9fa',
  minHeight: '100vh',
  gap: 20
});

// 📱 SIDEBAR PARENT
// Used by: navigation components, menu bars
const sidebar = new QElement('sidebar', {
  width: 250,
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  padding: 20,
  borderRadius: 8,
  boxShadow: '2px 0 4px rgba(0,0,0,0.1)'
});

// 📄 CONTENT AREA PARENT
// Used by: main content areas, article pages
const contentArea = new QElement('content_area', {
  flex: 1,
  padding: 20,
  backgroundColor: '#ffffff',
  borderRadius: 8,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

// 🏷️ BADGE PARENT
// Used by: status badges, tags, labels
const badge = new QElement('badge', {
  display: 'inline-block',
  padding: '4px 8px',
  borderRadius: 12,
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
});

// 📝 FORM INPUT PARENT
// Used by: all form inputs, text areas, selects
const formInput = new QElement('form_input', {
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: 4,
  fontSize: '14px',
  width: '100%',
  transition: 'border-color 0.2s ease',
  outline: 'none'
});

// 🎨 THEME VARIATIONS
// You can create theme variations of the same parent
const darkMainContainer = new QElement('dark_main_container', {
  ...mainContainer.style,
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  border: '2px solid #3498db'
});

// 📱 RESPONSIVE PARENTS
// Mobile-specific versions
const mobileMainContainer = new QElement('mobile_main_container', {
  ...mainContainer.style,
  padding: 10,
  margin: 5,
  fontSize: '14px'
});

// 🎯 REGISTER ALL PARENTS WITH THE MANAGER
// This makes them available to all child components
QElementManager.register(mainContainer);
QElementManager.register(cardContainer);
QElementManager.register(buttonContainer);
QElementManager.register(dashboardLayout);
QElementManager.register(sidebar);
QElementManager.register(contentArea);
QElementManager.register(badge);
QElementManager.register(formInput);
QElementManager.register(darkMainContainer);
QElementManager.register(mobileMainContainer);

// 🚀 EXPORT FOR USE IN CHILD FILES
export {
  mainContainer,
  cardContainer,
  buttonContainer,
  dashboardLayout,
  sidebar,
  contentArea,
  badge,
  formInput,
  darkMainContainer,
  mobileMainContainer
};

// 🎛️ UTILITY FUNCTIONS FOR GLOBAL CHANGES
export const changeMainTheme = (theme: 'light' | 'dark') => {
  if (theme === 'dark') {
    mainContainer.updateStyle({
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      border: '2px solid #3498db'
    });
  } else {
    mainContainer.updateStyle({
      backgroundColor: '#f0f0f0',
      color: '#333333',
      border: '2px solid #007acc'
    });
  }
};

export const changeCardStyle = (style: 'modern' | 'classic') => {
  if (style === 'modern') {
    cardContainer.updateStyle({
      borderRadius: 12,
      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
      border: 'none'
    });
  } else {
    cardContainer.updateStyle({
      borderRadius: 6,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    });
  }
};

export const changeButtonStyle = (variant: 'primary' | 'secondary' | 'danger') => {
  const styles = {
    primary: { backgroundColor: '#007acc', color: '#ffffff' },
    secondary: { backgroundColor: '#6c757d', color: '#ffffff' },
    danger: { backgroundColor: '#dc3545', color: '#ffffff' }
  };
  
  buttonContainer.updateStyle(styles[variant]);
};

/**
 * 🎯 HOW TO USE THIS FILE:
 * 
 * 1. Change any parent style above to affect ALL children
 * 2. Use the utility functions for theme changes
 * 3. Import this file in your main app to initialize parents
 * 4. Children in other files automatically inherit these styles
 * 
 * Example:
 * - Change mainContainer.backgroundColor to '#ff6b6b'
 * - ALL components using 'main_container' get red background
 * - No need to search through multiple files!
 */
