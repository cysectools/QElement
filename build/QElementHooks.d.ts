import { QElementStyle, QElementAnimation, QElementTheme } from './types';
export declare const useQElementAdvanced: (elementId: string) => {
    element: import("./QElement").QElement | null;
    updateParent: (newStyle: Partial<QElementStyle>) => void;
    override: (overrides: Partial<QElementStyle>) => void;
    reset: () => void;
    getComputed: () => QElementStyle | null;
    validate: () => {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    };
    isVisible: boolean;
    isEnabled: boolean;
    setVisible: (visible: boolean) => void;
    setEnabled: (enabled: boolean) => void;
    addAnimation: (name: string, animation: QElementAnimation) => void;
    removeAnimation: (name: string) => void;
    applyTheme: (themeName: string) => void;
    createResponsiveStyles: (responsiveStyles: {
        [breakpoint: string]: Partial<QElementStyle>;
    }) => void;
    currentBreakpoint: string;
    styleHash: string;
};
export declare const useQElementTheme: () => {
    currentTheme: string;
    availableThemes: string[];
    switchTheme: (themeName: string) => void;
    createTheme: (theme: QElementTheme) => void;
};
export declare const useQElementResponsive: (elementId: string) => {
    currentBreakpoint: string;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    createResponsiveStyle: (styles: {
        mobile?: Partial<QElementStyle>;
        tablet?: Partial<QElementStyle>;
        desktop?: Partial<QElementStyle>;
    }) => void;
};
export declare const useQElementAnimation: (elementId: string) => {
    animations: QElementAnimation[];
    isAnimating: boolean;
    addAnimation: (name: string, animation: QElementAnimation) => void;
    removeAnimation: (name: string) => void;
    playAnimation: (name: string) => void;
    stopAnimation: () => void;
};
export declare const useQElementPerformance: (elementId: string) => {
    renderCount: number;
    lastRenderTime: number;
    getPerformanceMetrics: () => {
        styleHash: string;
        renderCount: number;
        lastRenderTime: number;
        isVisible: boolean;
        isEnabled: boolean;
    } | null;
};
