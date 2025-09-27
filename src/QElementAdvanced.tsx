import React, { useEffect, useRef, ReactNode, useMemo } from 'react';
import { useQElementAdvanced, useQElementResponsive, useQElementAnimation } from './QElementHooks';
import { QElementStyle, QElementProps } from './types';

interface QElementAdvancedProps extends QElementProps {
  elementId: string;
  as?: keyof JSX.IntrinsicElements;
  responsive?: {
    mobile?: Partial<QElementStyle>;
    tablet?: Partial<QElementStyle>;
    desktop?: Partial<QElementStyle>;
  };
  animations?: {
    [name: string]: {
      name: string;
      duration: number;
      timingFunction: string;
      delay?: number;
      iterationCount?: number | 'infinite';
      direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
      fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
    };
  };
  onStyleChange?: (style: QElementStyle) => void;
  onVisibilityChange?: (visible: boolean) => void;
  onEnabledChange?: (enabled: boolean) => void;
  performanceMonitoring?: boolean;
}

export const QElementAdvanced: React.FC<QElementAdvancedProps> = ({
  elementId,
  as: Component = 'div',
  children,
  className,
  style: inlineStyle,
  responsive,
  animations,
  onStyleChange,
  onVisibilityChange,
  onEnabledChange,
  performanceMonitoring = false,
  ...props
}) => {
  const {
    element,
    updateParent,
    override,
    reset,
    getComputed,
    validate,
    isVisible,
    isEnabled,
    setVisible,
    setEnabled,
    addAnimation,
    removeAnimation,
    applyTheme,
    createResponsiveStyles,
    styleHash
  } = useQElementAdvanced(elementId);

  const {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    createResponsiveStyle
  } = useQElementResponsive(elementId);

  const {
    animations: elementAnimations,
    isAnimating,
    addAnimation: addElementAnimation,
    removeAnimation: removeElementAnimation,
    playAnimation,
    stopAnimation
  } = useQElementAnimation(elementId);

  const elementRef = useRef<HTMLElement>(null);

  // Set up responsive styles
  useEffect(() => {
    if (responsive) {
      createResponsiveStyle(responsive);
    }
  }, [responsive, createResponsiveStyle]);

  // Set up animations
  useEffect(() => {
    if (animations) {
      Object.entries(animations).forEach(([name, animation]) => {
        addElementAnimation(name, animation);
      });
    }
  }, [animations, addElementAnimation]);

  // Convert QElement style to CSS style object
  const convertToCSSStyle = (qStyle: QElementStyle): React.CSSProperties => {
    const cssStyle: React.CSSProperties = {};
    
    Object.entries(qStyle).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        // Convert camelCase to kebab-case for CSS properties
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssStyle[cssKey as keyof React.CSSProperties] = value as any;
      }
    });

    return cssStyle;
  };

  // Get computed style
  const computedStyle = useMemo(() => {
    const style = getComputed();
    return style ? convertToCSSStyle(style) : {};
  }, [getComputed, styleHash]);

  // Merge computed style with inline style
  const finalStyle: any = {
    ...computedStyle,
    ...inlineStyle,
    // Add visibility and enabled states
    display: isVisible ? (computedStyle.display || 'block') : 'none',
    pointerEvents: isEnabled ? 'auto' : 'none',
    opacity: isEnabled ? 1 : 0.5
  };

  // Add animation styles
  if (isAnimating && elementAnimations.length > 0) {
    const animation = elementAnimations[0]; // Use first animation
    finalStyle.animation = `${animation.name} ${animation.duration}ms ${animation.timingFunction}`;
    if (animation.delay) finalStyle.animationDelay = `${animation.delay}ms` as any;
    if (animation.iterationCount) finalStyle.animationIterationCount = animation.iterationCount.toString();
    if (animation.direction) finalStyle.animationDirection = animation.direction;
    if (animation.fillMode) finalStyle.animationFillMode = animation.fillMode;
  }

  // Performance monitoring
  useEffect(() => {
    if (performanceMonitoring) {
      console.log(`QElement ${elementId} rendered with style hash: ${styleHash}`);
    }
  }, [elementId, styleHash, performanceMonitoring]);

  // Style change callback
  useEffect(() => {
    if (onStyleChange) {
      const style = getComputed();
      if (style) {
        onStyleChange(style);
      }
    }
  }, [getComputed, onStyleChange, styleHash]);

  // Visibility change callback
  useEffect(() => {
    if (onVisibilityChange) {
      onVisibilityChange(isVisible);
    }
  }, [isVisible, onVisibilityChange]);

  // Enabled change callback
  useEffect(() => {
    if (onEnabledChange) {
      onEnabledChange(isEnabled);
    }
  }, [isEnabled, onEnabledChange]);

  // Validation
  const validation = validate();
  if (!validation.isValid) {
    console.warn(`QElement ${elementId} validation errors:`, validation.errors);
  }

  return React.createElement(
    Component,
    {
      ref: elementRef,
      className: className,
      style: finalStyle,
      'data-qelement-id': elementId,
      'data-qelement-breakpoint': currentBreakpoint,
      'data-qelement-visible': isVisible,
      'data-qelement-enabled': isEnabled,
      'data-qelement-animating': isAnimating,
      ...props
    },
    children
  );
};

