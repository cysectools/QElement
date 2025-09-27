# QElements Installation & Usage Guide

## 🚀 Quick Start

### Installation

```bash
# Install the package
npm install qelements

# Or with yarn
yarn add qelements

# Or with pnpm
pnpm add qelements
```

### Basic Setup

1. **Wrap your app with QElementProvider:**

```tsx
import React from 'react';
import { QElementProvider } from 'qelements';

function App() {
  return (
    <QElementProvider>
      {/* Your app components */}
    </QElementProvider>
  );
}

export default App;
```

2. **Create parent components:**

```tsx
import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const ParentComponent = () => {
  const { updateParent } = useQElementStyle('main_container_element');

  const handleUpdate = () => {
    // This affects ALL children with the same elementId
    updateParent({
      padding: 20,
      margin: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 8
    });
  };

  return (
    <div>
      <button onClick={handleUpdate}>Update Parent Style</button>
      <QElementComponent elementId="main_container_element">
        <p>Parent content</p>
      </QElementComponent>
    </div>
  );
};
```

3. **Create child components:**

```tsx
import React from 'react';
import { QElementComponent, useQElementStyle } from 'qelements';

const ChildComponent = () => {
  const { override, reset } = useQElementStyle('main_container_element');

  const handleOverride = () => {
    // This only affects THIS specific child
    override({
      padding: 30,
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3'
    });
  };

  return (
    <div>
      <button onClick={handleOverride}>Override Child Style</button>
      <button onClick={reset}>Reset to Parent</button>
      <QElementComponent elementId="main_container_element">
        <p>Child content</p>
      </QElementComponent>
    </div>
  );
};
```

## 🎨 Advanced Features

### Theme Management

```tsx
import { useQElementTheme } from 'qelements';

const ThemeDemo = () => {
  const { currentTheme, switchTheme, availableThemes } = useQElementTheme();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      {availableThemes.map(theme => (
        <button key={theme} onClick={() => switchTheme(theme)}>
          {theme}
        </button>
      ))}
    </div>
  );
};
```

### Responsive Design

```tsx
import { QElementAdvanced } from 'qelements';

const ResponsiveComponent = () => {
  return (
    <QElementAdvanced
      elementId="responsive-demo"
      responsive={{
        mobile: { padding: '10px', fontSize: '14px' },
        tablet: { padding: '20px', fontSize: '16px' },
        desktop: { padding: '30px', fontSize: '18px' }
      }}
    >
      <p>This adapts to screen size!</p>
    </QElementAdvanced>
  );
};
```

### Animations

```tsx
import { QElementAdvanced, useQElementAnimation } from 'qelements';

const AnimationComponent = () => {
  const { addAnimation, playAnimation } = useQElementAnimation('animated-element');

  const handleAddAnimation = () => {
    addAnimation('fadeIn', {
      name: 'fadeIn',
      duration: 1000,
      timingFunction: 'ease-in-out'
    });
  };

  return (
    <div>
      <button onClick={handleAddAnimation}>Add Animation</button>
      <button onClick={() => playAnimation('fadeIn')}>Play Animation</button>
      <QElementAdvanced
        elementId="animated-element"
        animations={{
          fadeIn: {
            name: 'fadeIn',
            duration: 1000,
            timingFunction: 'ease-in-out'
          }
        }}
      >
        <p>Animated content</p>
      </QElementAdvanced>
    </div>
  );
};
```

### Performance Monitoring

```tsx
import { useQElementPerformance } from 'qelements';

const PerformanceComponent = () => {
  const { renderCount, lastRenderTime, getPerformanceMetrics } = useQElementPerformance('monitored-element');

  const handleGetMetrics = () => {
    const metrics = getPerformanceMetrics();
    console.log('Performance metrics:', metrics);
  };

  return (
    <div>
      <p>Render count: {renderCount}</p>
      <p>Last render time: {lastRenderTime.toFixed(2)}ms</p>
      <button onClick={handleGetMetrics}>Get Metrics</button>
    </div>
  );
};
```

## 🔧 API Reference

### Core Components

- **QElementProvider**: Context provider for the QElement system
- **QElementComponent**: Basic React component with QElement styling
- **QElementAdvanced**: Advanced component with all features

### Hooks

- **useQElementStyle**: Basic style management
- **useQElementAdvanced**: Advanced element management
- **useQElementTheme**: Theme management
- **useQElementResponsive**: Responsive design
- **useQElementAnimation**: Animation management
- **useQElementPerformance**: Performance monitoring

### Core Classes

- **QElement**: Core element class
- **QElementManager**: Element management
- **QElementThemeManager**: Theme management
- **QElementValidator**: Style validation
- **QElementResponsiveManager**: Responsive utilities

## 📦 Package Structure

```
qelements/
├── dist/                    # Built JavaScript & TypeScript definitions
├── src/                     # Source code
│   ├── QElement.ts         # Core element class
│   ├── QElementManager.ts  # Element management
│   ├── QElementProvider.tsx # React context
│   ├── QElementComponent.tsx # Basic component
│   ├── QElementAdvanced.tsx # Advanced component
│   ├── QElementHooks.ts    # React hooks
│   ├── QElementTheme.ts   # Theme management
│   ├── QElementValidator.ts # Style validation
│   ├── QElementResponsive.ts # Responsive utilities
│   └── types.ts           # TypeScript definitions
├── examples/               # Usage examples
└── README.md              # Documentation
```

## 🎯 Key Benefits

- **Centralized Styling**: Change parent styles to affect all children
- **Selective Control**: Override specific properties for individual children
- **Type Safety**: Full TypeScript support with autocomplete
- **Performance**: Efficient style computation and updates
- **Flexibility**: Works with any React component structure
- **Themes**: Built-in theme system with CSS variables
- **Responsive**: Automatic responsive design support
- **Animations**: Powerful animation system
- **Validation**: Style validation with custom rules
- **Monitoring**: Performance monitoring and metrics

## 🚀 Getting Started

1. Install the package: `npm install qelements`
2. Wrap your app with `QElementProvider`
3. Use `QElementComponent` or `QElementAdvanced` for your elements
4. Use hooks to manage styles, themes, and animations
5. Check the examples for advanced usage patterns

## 📚 Examples

See the `examples/` directory for complete working examples:

- `main_example.tsx` - Basic parent-child relationship
- `badges_screen_example.tsx` - Child component with overrides
- `advanced-example.tsx` - All advanced features
- `App.tsx` - Complete demo application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- GitHub Issues: [Report bugs and request features](https://github.com/cysectools/QElement/issues)
- Documentation: [Full API documentation](https://github.com/cysectools/QElement#readme)
- Examples: [Working examples in the examples directory](https://github.com/cysectools/QElement/tree/main/examples)
