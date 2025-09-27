// Core classes
export { QElement } from './QElement';
export { QElementManager } from './QElementManager';
export { QElementThemeManager } from './QElementTheme';
export { QElementValidator } from './QElementValidator';
export { QElementResponsiveManager } from './QElementResponsive';

// React components and hooks
export { QElementProvider, useQElement } from './QElementProvider';
export { QElementComponent, useQElementStyle } from './QElementComponent';
export { QElementAdvanced } from './QElementAdvanced';

// Advanced hooks
export {
  useQElementAdvanced,
  useQElementTheme,
  useQElementResponsive,
  useQElementAnimation,
  useQElementPerformance
} from './QElementHooks';

// Types
export type {
  QElementStyle,
  QElementProps,
  QElementConfig,
  QElementMetadata,
  QElementTheme,
  QElementValidationRule,
  QElementValidationResult,
  QElementAnimation,
  QElementResponsiveConfig,
  QElementPerformanceConfig
} from './types';

// Re-export React for convenience
export { default as React } from 'react';
