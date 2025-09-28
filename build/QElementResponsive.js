export class QElementResponsiveManager {
    constructor(config) {
        this._mediaQueries = new Map();
        this._listeners = new Map();
        this._config = {
            breakpoints: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            },
            defaultBreakpoint: 'md',
            ...config
        };
        this._initializeMediaQueries();
    }
    _initializeMediaQueries() {
        Object.entries(this._config.breakpoints).forEach(([breakpoint, value]) => {
            const mediaQuery = window.matchMedia(`(min-width: ${value})`);
            this._mediaQueries.set(breakpoint, mediaQuery);
        });
    }
    // Get the current active breakpoint
    getCurrentBreakpoint() {
        const sortedBreakpoints = Object.entries(this._config.breakpoints)
            .sort(([, a], [, b]) => parseInt(a) - parseInt(b))
            .reverse();
        for (const [breakpoint, value] of sortedBreakpoints) {
            const mediaQuery = this._mediaQueries.get(breakpoint);
            if (mediaQuery && mediaQuery.matches) {
                return breakpoint;
            }
        }
        return 'sm'; // Default to smallest breakpoint
    }
    // Check if a breakpoint is currently active
    isBreakpointActive(breakpoint) {
        const mediaQuery = this._mediaQueries.get(breakpoint);
        return mediaQuery ? mediaQuery.matches : false;
    }
    // Get responsive styles for the current breakpoint
    getResponsiveStyles(style) {
        const currentBreakpoint = this.getCurrentBreakpoint();
        const responsiveStyle = { ...style };
        // Apply media query styles
        if (style['@media']) {
            const mediaStyles = style['@media'];
            // Apply styles for the current breakpoint and smaller ones
            const sortedBreakpoints = Object.keys(this._config.breakpoints)
                .sort((a, b) => parseInt(this._config.breakpoints[a]) - parseInt(this._config.breakpoints[b]));
            const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint);
            for (let i = 0; i <= currentIndex; i++) {
                const breakpoint = sortedBreakpoints[i];
                if (mediaStyles[breakpoint]) {
                    Object.assign(responsiveStyle, mediaStyles[breakpoint]);
                }
            }
        }
        // Remove the @media property as it's not a valid CSS property
        delete responsiveStyle['@media'];
        return responsiveStyle;
    }
    // Create responsive styles
    createResponsiveStyles(baseStyles, responsiveStyles) {
        return {
            ...baseStyles,
            '@media': responsiveStyles
        };
    }
    // Listen for breakpoint changes
    onBreakpointChange(callback) {
        const handleChange = () => {
            callback(this.getCurrentBreakpoint());
        };
        // Add listeners to all media queries
        this._mediaQueries.forEach((mediaQuery, breakpoint) => {
            const listener = (e) => {
                if (e.matches) {
                    handleChange();
                }
            };
            mediaQuery.addEventListener('change', listener);
            this._listeners.set(breakpoint, listener);
        });
        // Return cleanup function
        return () => {
            this._mediaQueries.forEach((mediaQuery, breakpoint) => {
                const listener = this._listeners.get(breakpoint);
                if (listener) {
                    mediaQuery.removeEventListener('change', listener);
                    this._listeners.delete(breakpoint);
                }
            });
        };
    }
    // Get breakpoint value
    getBreakpointValue(breakpoint) {
        return this._config.breakpoints[breakpoint];
    }
    // Get all breakpoints
    getBreakpoints() {
        return { ...this._config.breakpoints };
    }
    // Update configuration
    updateConfig(newConfig) {
        this._config = { ...this._config, ...newConfig };
        this._initializeMediaQueries();
    }
    // Check if a breakpoint exists
    hasBreakpoint(breakpoint) {
        return breakpoint in this._config.breakpoints;
    }
    // Add a new breakpoint
    addBreakpoint(breakpoint, value) {
        this._config.breakpoints[breakpoint] = value;
        this._initializeMediaQueries();
    }
    // Remove a breakpoint
    removeBreakpoint(breakpoint) {
        delete this._config.breakpoints[breakpoint];
        this._initializeMediaQueries();
    }
    // Get the next breakpoint
    getNextBreakpoint(currentBreakpoint) {
        const sortedBreakpoints = Object.keys(this._config.breakpoints)
            .sort((a, b) => parseInt(this._config.breakpoints[a]) - parseInt(this._config.breakpoints[b]));
        const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint);
        return currentIndex < sortedBreakpoints.length - 1 ? sortedBreakpoints[currentIndex + 1] : null;
    }
    // Get the previous breakpoint
    getPreviousBreakpoint(currentBreakpoint) {
        const sortedBreakpoints = Object.keys(this._config.breakpoints)
            .sort((a, b) => parseInt(this._config.breakpoints[a]) - parseInt(this._config.breakpoints[b]));
        const currentIndex = sortedBreakpoints.indexOf(currentBreakpoint);
        return currentIndex > 0 ? sortedBreakpoints[currentIndex - 1] : null;
    }
}
