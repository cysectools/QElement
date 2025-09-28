import { QElementStyle, QElementResponsiveConfig } from './types';
export declare class QElementResponsiveManager {
    private _config;
    private _mediaQueries;
    private _listeners;
    constructor(config?: Partial<QElementResponsiveConfig>);
    private _initializeMediaQueries;
    getCurrentBreakpoint(): string;
    isBreakpointActive(breakpoint: string): boolean;
    getResponsiveStyles(style: QElementStyle): QElementStyle;
    createResponsiveStyles(baseStyles: QElementStyle, responsiveStyles: {
        [breakpoint: string]: Partial<QElementStyle>;
    }): QElementStyle;
    onBreakpointChange(callback: (breakpoint: string) => void): () => void;
    getBreakpointValue(breakpoint: string): string | undefined;
    getBreakpoints(): {
        [key: string]: string;
    };
    updateConfig(newConfig: Partial<QElementResponsiveConfig>): void;
    hasBreakpoint(breakpoint: string): boolean;
    addBreakpoint(breakpoint: string, value: string): void;
    removeBreakpoint(breakpoint: string): void;
    getNextBreakpoint(currentBreakpoint: string): string | null;
    getPreviousBreakpoint(currentBreakpoint: string): string | null;
}
