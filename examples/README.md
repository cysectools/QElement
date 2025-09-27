# QElements Examples

This directory contains examples demonstrating how to use the QElements package.

## Running the Examples

1. Install dependencies:
```bash
npm install
```

2. Build the package:
```bash
npm run build
```

3. Run the example (you'll need to set up a React app):
```bash
# In your React app, import and use the components
import { QElementProvider, QElementComponent, useQElementStyle } from 'qelements';
```

## Example Structure

### main_example.tsx
- Contains the parent component that controls the base styles
- Uses `useQElementStyle` to update parent styles
- Changes affect ALL children with the same elementId

### badges_screen_example.tsx
- Contains child components that inherit from the parent
- Uses `useQElementStyle` to override styles for specific children
- Each child can have independent overrides

### App.tsx
- Wraps everything in `QElementProvider`
- Demonstrates the complete parent-child relationship

## Key Concepts

1. **Parent Control**: The parent component defines base styles for an elementId
2. **Child Inheritance**: All children with the same elementId inherit parent styles
3. **Child Override**: Individual children can override specific properties
4. **Independent Children**: Each child can have different overrides while sharing the base

## Usage Pattern

```tsx
// Parent component
const ParentComponent = () => {
  const { updateParent } = useQElementStyle('my_element');
  
  const handleUpdate = () => {
    updateParent({ padding: 20, backgroundColor: '#f0f0f0' });
  };
  
  return (
    <QElementComponent elementId="my_element">
      <p>This affects all children with the same elementId</p>
    </QElementComponent>
  );
};

// Child component
const ChildComponent = () => {
  const { override, reset } = useQElementStyle('my_element');
  
  const handleOverride = () => {
    override({ padding: 30, backgroundColor: '#e3f2fd' });
  };
  
  return (
    <QElementComponent elementId="my_element">
      <p>This child can override specific properties</p>
    </QElementComponent>
  );
};
```
