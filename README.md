# QElements

A TypeScript/TSX package for parent-child UI element management with cascading styles. QElements allows you to create a hierarchical styling system where parent elements control base styles and child elements can inherit or override specific properties.

## 🚀 Live Demo

Check out the live demo at: **[https://q-elements-demo.vercel.app](https://q-elements-demo.vercel.app)**

## Features

- 🎯 **Parent-Child Relationships**: Create hierarchical element structures
- 🎨 **Style Inheritance**: Children automatically inherit parent styles
- 🔧 **Selective Overrides**: Children can override specific properties without affecting others
- ⚛️ **React Integration**: Full TypeScript and TSX support
- 🚀 **Type Safe**: Complete TypeScript definitions
- 📦 **Lightweight**: Minimal dependencies

## Installation

```bash
npm install qelements
```

## Quick Start

### 1. Wrap your app with QElementProvider

```tsx
import { QElementProvider } from 'qelements';

function App() {
  return (
    <QElementProvider>
      {/* Your app components */}
    </QElementProvider>
  );
}
```

### 2. Create parent components

```tsx
import { QElementComponent, useQElementStyle } from 'qelements';

const ParentComponent = () => {
  const { updateParent } = useQElementStyle('main_container_element');

  const handleUpdate = () => {
    // This affects ALL children with the same elementId
    updateParent({
      padding: 20,
      margin: 10,
      backgroundColor: '#f0f0f0'
    });
  };

  return (
    <QElementComponent elementId="main_container_element">
      <p>Parent content</p>
    </QElementComponent>
  );
};
```

### 3. Create child components

```tsx
const ChildComponent = () => {
  const { override, reset } = useQElementStyle('main_container_element');

  const handleOverride = () => {
    // This only affects THIS specific child
    override({
      padding: 30,
      backgroundColor: '#e3f2fd'
    });
  };

  return (
    <QElementComponent elementId="main_container_element">
      <p>Child content</p>
    </QElementComponent>
  );
};
```

## API Reference

### Components

#### `QElementProvider`
Context provider that manages the QElement system.

#### `QElementComponent`
React component that renders elements with QElement styling.

**Props:**
- `elementId: string` - Unique identifier for the element
- `as?: keyof JSX.IntrinsicElements` - HTML element to render (default: 'div')
- `children?: ReactNode` - Child components
- `style?: React.CSSProperties` - Inline styles (merged with QElement styles)
- `className?: string` - CSS class name
- `...props` - Additional HTML attributes

### Hooks

#### `useQElementStyle(elementId: string)`
Hook for managing QElement styles.

**Returns:**
- `updateParent(style: Partial<QElementStyle>)` - Update parent styles (affects all children)
- `override(overrides: Partial<QElementStyle>)` - Override styles for this element only
- `reset()` - Reset overrides to parent values
- `getComputed()` - Get computed styles for this element

### Types

#### `QElementStyle`
Interface for QElement style properties:

```typescript
interface QElementStyle {
  padding?: number | string;
  margin?: number | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  border?: string;
  borderRadius?: number | string;
  width?: number | string;
  height?: number | string;
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number | string;
  [key: string]: any;
}
```

## Examples

See the `examples/` directory for complete working examples.

## How It Works

1. **Parent Control**: Parent components define base styles for an elementId
2. **Child Inheritance**: All children with the same elementId inherit parent styles
3. **Child Override**: Individual children can override specific properties
4. **Independent Children**: Each child can have different overrides while sharing the base

## Benefits

- **Centralized Styling**: Change parent styles to affect all children
- **Selective Control**: Override specific properties for individual children
- **Type Safety**: Full TypeScript support with autocomplete
- **Performance**: Efficient style computation and updates
- **Flexibility**: Works with any React component structure

## License

MIT
