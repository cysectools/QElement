import React, { useState } from 'react';
import { 
  QElementProvider, 
  QElementAdvanced, 
  useQElementAdvanced, 
  useQElementTheme,
  useQElementResponsive,
  useQElementAnimation 
} from '../src';

// Advanced example demonstrating all features
const AdvancedExample: React.FC = () => {
  const [theme, setTheme] = useState('default');
  const [isVisible, setIsVisible] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <QElementProvider>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>QElements Advanced Features Demo</h1>
        
        <div style={{ marginBottom: '20px' }}>
          <h2>Theme Management</h2>
          <ThemeDemo />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Responsive Design</h2>
          <ResponsiveDemo />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Animations</h2>
          <AnimationDemo />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Advanced Styling</h2>
          <AdvancedStylingDemo />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Performance Monitoring</h2>
          <PerformanceDemo />
        </div>
      </div>
    </QElementProvider>
  );
};

// Theme management demo
const ThemeDemo: React.FC = () => {
  const { currentTheme, availableThemes, switchTheme } = useQElementTheme();

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <div>
        {availableThemes.map(theme => (
          <button
            key={theme}
            onClick={() => switchTheme(theme)}
            style={{
              margin: '5px',
              padding: '8px 16px',
              backgroundColor: theme === currentTheme ? '#3b82f6' : '#e5e7eb',
              color: theme === currentTheme ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
};

// Responsive design demo
const ResponsiveDemo: React.FC = () => {
  const { currentBreakpoint, isMobile, isTablet, isDesktop } = useQElementResponsive('responsive-demo');

  return (
    <div>
      <p>Current breakpoint: {currentBreakpoint}</p>
      <p>Device type: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : isDesktop ? 'Desktop' : 'Unknown'}</p>
      
      <QElementAdvanced
        elementId="responsive-demo"
        responsive={{
          mobile: { padding: '10px', fontSize: '14px' },
          tablet: { padding: '20px', fontSize: '16px' },
          desktop: { padding: '30px', fontSize: '18px' }
        }}
        style={{
          backgroundColor: '#f0f0f0',
          border: '2px solid #333',
          borderRadius: '8px',
          margin: '10px 0'
        }}
      >
        <p>This element adapts to different screen sizes!</p>
        <p>Resize your browser to see the changes.</p>
      </QElementAdvanced>
    </div>
  );
};

// Animation demo
const AnimationDemo: React.FC = () => {
  const { animations, isAnimating, addAnimation, playAnimation, stopAnimation } = useQElementAnimation('animation-demo');

  const handleAddAnimation = () => {
    addAnimation('fadeIn', {
      name: 'fadeIn',
      duration: 1000,
      timingFunction: 'ease-in-out',
      delay: 0,
      iterationCount: 1,
      direction: 'normal',
      fillMode: 'forwards'
    });
  };

  const handlePlayAnimation = () => {
    playAnimation('fadeIn');
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleAddAnimation} style={{ marginRight: '10px' }}>
          Add Animation
        </button>
        <button onClick={handlePlayAnimation} style={{ marginRight: '10px' }}>
          Play Animation
        </button>
        <button onClick={stopAnimation}>
          Stop Animation
        </button>
      </div>
      
      <p>Animations: {animations.length}</p>
      <p>Is animating: {isAnimating ? 'Yes' : 'No'}</p>
      
      <QElementAdvanced
        elementId="animation-demo"
        animations={{
          fadeIn: {
            name: 'fadeIn',
            duration: 1000,
            timingFunction: 'ease-in-out'
          }
        }}
        style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          border: '2px solid #2196f3'
        }}
      >
        <p>This element can be animated!</p>
      </QElementAdvanced>
    </div>
  );
};

// Advanced styling demo
const AdvancedStylingDemo: React.FC = () => {
  const { updateParent, override, reset, getComputed, validate } = useQElementAdvanced('advanced-styling');

  const handleUpdateParent = () => {
    updateParent({
      backgroundColor: '#f0f0f0',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    });
  };

  const handleOverride = () => {
    override({
      backgroundColor: '#e3f2fd',
      border: '2px solid #2196f3',
      transform: 'scale(1.05)'
    });
  };

  const handleReset = () => {
    reset();
  };

  const handleValidate = () => {
    const validation = validate();
    console.log('Validation result:', validation);
    alert(`Validation: ${validation.isValid ? 'Valid' : 'Invalid'}\nErrors: ${validation.errors.join(', ')}\nWarnings: ${validation.warnings.join(', ')}`);
  };

  const handleGetComputed = () => {
    const computed = getComputed();
    console.log('Computed styles:', computed);
    alert(`Computed styles: ${JSON.stringify(computed, null, 2)}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleUpdateParent} style={{ marginRight: '10px' }}>
          Update Parent
        </button>
        <button onClick={handleOverride} style={{ marginRight: '10px' }}>
          Override
        </button>
        <button onClick={handleReset} style={{ marginRight: '10px' }}>
          Reset
        </button>
        <button onClick={handleValidate} style={{ marginRight: '10px' }}>
          Validate
        </button>
        <button onClick={handleGetComputed}>
          Get Computed
        </button>
      </div>
      
      <QElementAdvanced
        elementId="advanced-styling"
        style={{
          backgroundColor: '#fff',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          transition: 'all 0.3s ease'
        }}
        onStyleChange={(style) => console.log('Style changed:', style)}
        performanceMonitoring={true}
      >
        <p>This element demonstrates advanced styling features!</p>
        <p>Check the console for performance monitoring and style changes.</p>
      </QElementAdvanced>
    </div>
  );
};

// Performance monitoring demo
const PerformanceDemo: React.FC = () => {
  const { renderCount, lastRenderTime, getPerformanceMetrics } = useQElementPerformance('performance-demo');

  const handleGetMetrics = () => {
    const metrics = getPerformanceMetrics();
    console.log('Performance metrics:', metrics);
    alert(`Performance metrics: ${JSON.stringify(metrics, null, 2)}`);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleGetMetrics}>
          Get Performance Metrics
        </button>
      </div>
      
      <p>Render count: {renderCount}</p>
      <p>Last render time: {lastRenderTime.toFixed(2)}ms</p>
      
      <QElementAdvanced
        elementId="performance-demo"
        style={{
          backgroundColor: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #dee2e6'
        }}
        performanceMonitoring={true}
      >
        <p>This element is being monitored for performance!</p>
        <p>Check the console for detailed metrics.</p>
      </QElementAdvanced>
    </div>
  );
};

export default AdvancedExample;
