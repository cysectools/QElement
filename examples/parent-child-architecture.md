# QElements Parent-Child Architecture

## 🎯 Your Vision: One Main File + Multiple Child Files

This is exactly how QElements works! Here's the architecture:

### 📁 File Structure
```
src/
├── styles/
│   └── main-parents.tsx          # 🎯 MAIN PARENTS FILE
├── components/
│   ├── app.tsx                   # Child file
│   ├── mainapp.tsx               # Child file  
│   ├── qelementtooltips.tsx      # Child file
│   └── dashboard.tsx             # Child file
```

## 🏗️ How It Works

### 1. **Main Parents File** (`styles/main-parents.tsx`)
```tsx
// This file contains ALL parent styles for your entire app
import { QElementManager } from 'qelements';

// Initialize the main parent elements
const mainContainer = new QElement('main_container', {
  padding: 20,
  margin: 10,
  backgroundColor: '#f0f0f0',
  borderRadius: 8,
  border: '2px solid #007acc'
});

const cardContainer = new QElement('card_container', {
  padding: 15,
  margin: 5,
  backgroundColor: '#ffffff',
  borderRadius: 6,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
});

const buttonContainer = new QElement('button_container', {
  padding: 10,
  margin: 5,
  backgroundColor: '#007acc',
  color: '#ffffff',
  borderRadius: 4,
  cursor: 'pointer'
});

// Register all parents with the manager
QElementManager.register(mainContainer);
QElementManager.register(cardContainer);
QElementManager.register(buttonContainer);

export { mainContainer, cardContainer, buttonContainer };
```

### 2. **Child Files** (app.tsx, mainapp.tsx, etc.)
```tsx
// app.tsx - Child file
import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const App = () => {
  // This child inherits from 'main_container' parent
  return (
    <QElementComponent elementId="main_container">
      <h1>Welcome to App</h1>
      <p>This inherits all main_container styles</p>
    </QElementComponent>
  );
};

export default App;
```

```tsx
// mainapp.tsx - Another child file
import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const MainApp = () => {
  // This child also inherits from 'main_container' parent
  return (
    <QElementComponent elementId="main_container">
      <div>
        <h2>Main App Content</h2>
        <p>This also inherits main_container styles</p>
      </div>
    </QElementComponent>
  );
};

export default MainApp;
```

```tsx
// qelementtooltips.tsx - Another child file
import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const QElementTooltips = () => {
  // This child inherits from 'card_container' parent
  return (
    <QElementComponent elementId="card_container">
      <div>
        <h3>Tooltip Component</h3>
        <p>This inherits card_container styles</p>
      </div>
    </QElementComponent>
  );
};

export default QElementTooltips;
```

## 🎯 The Magic: Change Parent = Change All Children

### **Scenario 1: Change Parent Style**
```tsx
// In your main-parents.tsx file
mainContainer.updateStyle({
  backgroundColor: '#ff6b6b',  // Changed from '#f0f0f0'
  borderRadius: 12,             // Changed from 8
  border: '3px solid #ff6b6b'  // Changed from '#007acc'
});
```

**Result**: ALL children using `main_container` (app.tsx, mainapp.tsx) automatically get the new red styling!

### **Scenario 2: Individual Child Override**
```tsx
// In app.tsx - only this child gets different styling
const App = () => {
  const { override } = useQElementStyle('main_container');
  
  const handleSpecialStyling = () => {
    override({
      backgroundColor: '#4ecdc4',  // Only this child gets teal
      border: '2px dashed #4ecdc4'
    });
  };

  return (
    <QElementComponent elementId="main_container">
      <button onClick={handleSpecialStyling}>
        Make This Child Special
      </button>
    </QElementComponent>
  );
};
```

**Result**: Only app.tsx gets the teal styling, mainapp.tsx keeps the parent's red styling.

## 🔄 Complete Workflow

### **Step 1: Define Parents** (main-parents.tsx)
- Create all your main container styles
- Register them with QElementManager
- Export for use across your app

### **Step 2: Use in Child Files**
- Import QElementComponent and useQElementStyle
- Use the same `elementId` to inherit parent styles
- Optionally override individual child styles

### **Step 3: Global Changes**
- Change parent styles in main-parents.tsx
- All children automatically update
- No need to search through multiple files!

## 🎨 Real-World Example

```tsx
// styles/main-parents.tsx
const dashboardLayout = new QElement('dashboard_layout', {
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  backgroundColor: '#f8f9fa',
  minHeight: '100vh'
});

const sidebar = new QElement('sidebar', {
  width: 250,
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  padding: 20
});

const contentArea = new QElement('content_area', {
  flex: 1,
  padding: 20,
  backgroundColor: '#ffffff',
  marginLeft: 20
});
```

```tsx
// components/dashboard.tsx
const Dashboard = () => (
  <QElementComponent elementId="dashboard_layout">
    <QElementComponent elementId="sidebar">
      <h3>Navigation</h3>
    </QElementComponent>
    <QElementComponent elementId="content_area">
      <h1>Dashboard Content</h1>
    </QElementComponent>
  </QElementComponent>
);
```

**Change the parent styles in main-parents.tsx, and the entire dashboard updates!**

## ✅ This is Exactly What You Wanted!

- ✅ **One main file** with all parent styles
- ✅ **Multiple child files** that inherit from parents
- ✅ **Change parent = change all children**
- ✅ **Individual child overrides** when needed
- ✅ **No file searching** required for global changes

QElements was designed exactly for this workflow! 🎉
