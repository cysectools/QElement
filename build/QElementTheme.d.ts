import { QElementTheme, QElementStyle } from './types';
export declare class QElementThemeManager {
    private _themes;
    private _currentTheme;
    private _customProperties;
    constructor();
    private _initializeDefaultTheme;
    registerTheme(theme: QElementTheme): void;
    setCurrentTheme(themeName: string): void;
    getCurrentTheme(): QElementTheme;
    getTheme(themeName: string): QElementTheme | null;
    getAvailableThemes(): string[];
    applyThemeVariables(style: QElementStyle): QElementStyle;
    private _getThemeValue;
    setCustomProperty(key: string, value: any): void;
    getCustomProperty(key: string): any;
    createThemedStyle(baseStyle: QElementStyle): QElementStyle;
    generateCSSVariables(): string;
}
