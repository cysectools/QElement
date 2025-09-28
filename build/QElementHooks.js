import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useQElement } from './QElementProvider';
// Advanced hook for QElement management
export const useQElementAdvanced = (elementId) => {
    const { manager, forceUpdate } = useQElement();
    const [isVisible, setIsVisible] = useState(true);
    const [isEnabled, setIsEnabled] = useState(true);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('md');
    const [styleHash, setStyleHash] = useState('');
    const element = useMemo(() => manager.getElement(elementId), [manager, elementId]);
    // Update style hash when element changes
    useEffect(() => {
        if (element) {
            setStyleHash(element.getStyleHash());
        }
    }, [element]);
    // Listen for breakpoint changes
    useEffect(() => {
        if (element) {
            const cleanup = element.onStyleChange(() => {
                setStyleHash(element.getStyleHash());
                forceUpdate();
            });
            return cleanup;
        }
    }, [element, forceUpdate]);
    const updateParent = useCallback((newStyle) => {
        if (element) {
            element.updateStyle(newStyle);
        }
    }, [element]);
    const override = useCallback((overrides) => {
        if (element) {
            element.overrideStyle(overrides);
        }
    }, [element]);
    const reset = useCallback(() => {
        if (element) {
            element.resetToParent();
        }
    }, [element]);
    const getComputed = useCallback(() => {
        return element ? element.computedStyle : null;
    }, [element]);
    const validate = useCallback(() => {
        return element ? element.validateStyle() : { isValid: true, errors: [], warnings: [] };
    }, [element]);
    const setVisible = useCallback((visible) => {
        setIsVisible(visible);
        if (element) {
            element.setVisible(visible);
        }
    }, [element]);
    const setEnabled = useCallback((enabled) => {
        setIsEnabled(enabled);
        if (element) {
            element.setEnabled(enabled);
        }
    }, [element]);
    const addAnimation = useCallback((name, animation) => {
        if (element) {
            element.addAnimation(name, animation);
        }
    }, [element]);
    const removeAnimation = useCallback((name) => {
        if (element) {
            element.removeAnimation(name);
        }
    }, [element]);
    const applyTheme = useCallback((themeName) => {
        if (element) {
            element.applyTheme(themeName);
        }
    }, [element]);
    const createResponsiveStyles = useCallback((responsiveStyles) => {
        if (element) {
            element.createResponsiveStyles(responsiveStyles);
        }
    }, [element]);
    return {
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
        currentBreakpoint,
        styleHash
    };
};
// Hook for theme management
export const useQElementTheme = () => {
    const { manager } = useQElement();
    const [currentTheme, setCurrentTheme] = useState('default');
    const [availableThemes, setAvailableThemes] = useState([]);
    useEffect(() => {
        // Get available themes from the manager
        const themes = manager.getAllElements()
            .map(el => el.getCurrentTheme())
            .filter((theme, index, arr) => arr.indexOf(theme) === index);
        setAvailableThemes(themes);
    }, [manager]);
    const switchTheme = useCallback((themeName) => {
        setCurrentTheme(themeName);
        // Apply theme to all elements
        manager.getAllElements().forEach(element => {
            element.applyTheme(themeName);
        });
    }, [manager]);
    const createTheme = useCallback((theme) => {
        // This would need to be implemented in the manager
        console.log('Creating theme:', theme);
    }, []);
    return {
        currentTheme,
        availableThemes,
        switchTheme,
        createTheme
    };
};
// Hook for responsive design
export const useQElementResponsive = (elementId) => {
    const { manager } = useQElement();
    const [currentBreakpoint, setCurrentBreakpoint] = useState('md');
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const element = useMemo(() => manager.getElement(elementId), [manager, elementId]);
    useEffect(() => {
        if (element) {
            const breakpoint = element.getCurrentBreakpoint();
            setCurrentBreakpoint(breakpoint);
            setIsMobile(breakpoint === 'sm');
            setIsTablet(breakpoint === 'md');
            setIsDesktop(['lg', 'xl', '2xl'].includes(breakpoint));
        }
    }, [element]);
    const createResponsiveStyle = useCallback((styles) => {
        if (element) {
            const responsiveStyles = {};
            if (styles.mobile)
                responsiveStyles.sm = styles.mobile;
            if (styles.tablet)
                responsiveStyles.md = styles.tablet;
            if (styles.desktop)
                responsiveStyles.lg = styles.desktop;
            element.createResponsiveStyles(responsiveStyles);
        }
    }, [element]);
    return {
        currentBreakpoint,
        isMobile,
        isTablet,
        isDesktop,
        createResponsiveStyle
    };
};
// Hook for animations
export const useQElementAnimation = (elementId) => {
    const { manager } = useQElement();
    const [animations, setAnimations] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const element = useMemo(() => manager.getElement(elementId), [manager, elementId]);
    useEffect(() => {
        if (element) {
            setAnimations(element.getAllAnimations());
        }
    }, [element]);
    const addAnimation = useCallback((name, animation) => {
        if (element) {
            element.addAnimation(name, animation);
            setAnimations(element.getAllAnimations());
        }
    }, [element]);
    const removeAnimation = useCallback((name) => {
        if (element) {
            element.removeAnimation(name);
            setAnimations(element.getAllAnimations());
        }
    }, [element]);
    const playAnimation = useCallback((name) => {
        if (element) {
            const animation = element.getAnimation(name);
            if (animation) {
                setIsAnimating(true);
                // Simulate animation duration
                setTimeout(() => setIsAnimating(false), animation.duration);
            }
        }
    }, [element]);
    const stopAnimation = useCallback(() => {
        setIsAnimating(false);
    }, []);
    return {
        animations,
        isAnimating,
        addAnimation,
        removeAnimation,
        playAnimation,
        stopAnimation
    };
};
// Hook for performance monitoring
export const useQElementPerformance = (elementId) => {
    const { manager } = useQElement();
    const [renderCount, setRenderCount] = useState(0);
    const [lastRenderTime, setLastRenderTime] = useState(0);
    const renderStartTime = useRef(0);
    const element = useMemo(() => manager.getElement(elementId), [manager, elementId]);
    useEffect(() => {
        renderStartTime.current = performance.now();
        setRenderCount(prev => prev + 1);
        const renderTime = performance.now() - renderStartTime.current;
        setLastRenderTime(renderTime);
    });
    const getPerformanceMetrics = useCallback(() => {
        if (element) {
            return {
                styleHash: element.getStyleHash(),
                renderCount,
                lastRenderTime,
                isVisible: element.isVisible,
                isEnabled: element.isEnabled
            };
        }
        return null;
    }, [element, renderCount, lastRenderTime]);
    return {
        renderCount,
        lastRenderTime,
        getPerformanceMetrics
    };
};
