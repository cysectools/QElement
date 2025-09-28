export class QElementThemeManager {
    constructor() {
        this._themes = new Map();
        this._currentTheme = 'default';
        this._customProperties = new Map();
        this._initializeDefaultTheme();
    }
    _initializeDefaultTheme() {
        const defaultTheme = {
            name: 'default',
            colors: {
                primary: '#3b82f6',
                secondary: '#8b5cf6',
                background: '#ffffff',
                surface: '#f8fafc',
                text: '#1f2937',
                textSecondary: '#6b7280',
                border: '#e5e7eb',
                error: '#ef4444',
                warning: '#f59e0b',
                success: '#10b981',
                info: '#06b6d4'
            },
            typography: {
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontSize: {
                    xs: '0.75rem',
                    sm: '0.875rem',
                    base: '1rem',
                    lg: '1.125rem',
                    xl: '1.25rem',
                    '2xl': '1.5rem',
                    '3xl': '1.875rem'
                },
                fontWeight: {
                    light: 300,
                    normal: 400,
                    medium: 500,
                    semibold: 600,
                    bold: 700
                }
            },
            spacing: {
                xs: '0.25rem',
                sm: '0.5rem',
                md: '1rem',
                lg: '1.5rem',
                xl: '2rem',
                '2xl': '3rem'
            },
            breakpoints: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            },
            borderRadius: {
                none: '0',
                sm: '0.125rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                full: '9999px'
            },
            shadows: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
            }
        };
        this._themes.set('default', defaultTheme);
    }
    // Register a new theme
    registerTheme(theme) {
        this._themes.set(theme.name, theme);
    }
    // Set the current theme
    setCurrentTheme(themeName) {
        if (this._themes.has(themeName)) {
            this._currentTheme = themeName;
        }
        else {
            throw new Error(`Theme "${themeName}" not found`);
        }
    }
    // Get the current theme
    getCurrentTheme() {
        return this._themes.get(this._currentTheme) || this._themes.get('default');
    }
    // Get a specific theme
    getTheme(themeName) {
        return this._themes.get(themeName) || null;
    }
    // Get all available themes
    getAvailableThemes() {
        return Array.from(this._themes.keys());
    }
    // Apply theme variables to a style object
    applyThemeVariables(style) {
        const theme = this.getCurrentTheme();
        const processedStyle = { ...style };
        // Process theme variables
        Object.entries(processedStyle).forEach(([key, value]) => {
            if (typeof value === 'string' && value.startsWith('$')) {
                const variableName = value.substring(1);
                const themeValue = this._getThemeValue(theme, variableName);
                if (themeValue !== undefined) {
                    processedStyle[key] = themeValue;
                }
            }
        });
        return processedStyle;
    }
    // Get a theme value by path (e.g., 'colors.primary')
    _getThemeValue(theme, path) {
        const keys = path.split('.');
        let value = theme;
        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            }
            else {
                return undefined;
            }
        }
        return value;
    }
    // Set custom properties
    setCustomProperty(key, value) {
        this._customProperties.set(key, value);
    }
    // Get custom property
    getCustomProperty(key) {
        return this._customProperties.get(key);
    }
    // Create a style with theme variables
    createThemedStyle(baseStyle) {
        return this.applyThemeVariables(baseStyle);
    }
    // Generate CSS custom properties for the current theme
    generateCSSVariables() {
        const theme = this.getCurrentTheme();
        const variables = [];
        // Add color variables
        Object.entries(theme.colors).forEach(([key, value]) => {
            variables.push(`--qelement-color-${key}: ${value};`);
        });
        // Add spacing variables
        Object.entries(theme.spacing).forEach(([key, value]) => {
            variables.push(`--qelement-spacing-${key}: ${value};`);
        });
        // Add typography variables
        variables.push(`--qelement-font-family: ${theme.typography.fontFamily};`);
        Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
            variables.push(`--qelement-font-size-${key}: ${value};`);
        });
        Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
            variables.push(`--qelement-font-weight-${key}: ${value};`);
        });
        // Add border radius variables
        Object.entries(theme.borderRadius).forEach(([key, value]) => {
            variables.push(`--qelement-border-radius-${key}: ${value};`);
        });
        // Add shadow variables
        Object.entries(theme.shadows).forEach(([key, value]) => {
            variables.push(`--qelement-shadow-${key}: ${value};`);
        });
        return `:root {\n  ${variables.join('\n  ')}\n}`;
    }
}
