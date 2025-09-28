import { QElementValidator } from './QElementValidator';
import { QElementThemeManager } from './QElementTheme';
import { QElementResponsiveManager } from './QElementResponsive';
export class QElement {
    constructor(id, style = {}, metadata = {}, validator, themeManager, responsiveManager) {
        this._parent = null;
        this._children = [];
        this._overrides = {};
        this._metadata = {};
        this._animations = new Map();
        this._isVisible = true;
        this._isEnabled = true;
        // Event system for style changes
        this._styleChangeListeners = [];
        this._id = id;
        this._style = { ...style };
        this._metadata = { ...metadata };
        this._validator = validator || new QElementValidator();
        this._themeManager = themeManager || new QElementThemeManager();
        this._responsiveManager = responsiveManager || new QElementResponsiveManager();
    }
    get id() {
        return this._id;
    }
    get style() {
        return this._style;
    }
    get parent() {
        return this._parent;
    }
    get children() {
        return [...this._children];
    }
    get overrides() {
        return { ...this._overrides };
    }
    // Get the computed style (parent styles + overrides + theme + responsive)
    get computedStyle() {
        const parentStyle = this._parent?.computedStyle || {};
        const baseStyle = { ...parentStyle, ...this._overrides };
        // Apply theme variables
        const themedStyle = this._themeManager.applyThemeVariables(baseStyle);
        // Apply responsive styles
        const responsiveStyle = this._responsiveManager.getResponsiveStyles(themedStyle);
        return responsiveStyle;
    }
    // Set parent element
    setParent(parent) {
        if (this._parent) {
            this._parent.removeChild(this);
        }
        this._parent = parent;
        parent._children.push(this);
    }
    // Add child element
    addChild(child) {
        child.setParent(this);
    }
    // Remove child element
    removeChild(child) {
        const index = this._children.indexOf(child);
        if (index > -1) {
            this._children.splice(index, 1);
            child._parent = null;
        }
    }
    // Reset overrides to parent values
    resetOverrides() {
        this._overrides = {};
    }
    // Get a specific style property (with inheritance)
    getStyleProperty(property) {
        const computed = this.computedStyle;
        return computed[property];
    }
    // Set a specific style property (as override)
    setStyleProperty(property, value) {
        this.overrideStyle({ [property]: value });
    }
    // Convert to configuration object
    toConfig() {
        return {
            id: this._id,
            style: this._style,
            children: this._children.map(child => child.toConfig())
        };
    }
    // Create from configuration
    static fromConfig(config) {
        const element = new QElement(config.id, config.style);
        if (config.children) {
            config.children.forEach(childConfig => {
                const child = QElement.fromConfig(childConfig);
                element.addChild(child);
            });
        }
        return element;
    }
    // Find element by ID
    findById(id) {
        if (this._id === id) {
            return this;
        }
        for (const child of this._children) {
            const found = child.findById(id);
            if (found)
                return found;
        }
        return null;
    }
    // Get all descendants
    getAllDescendants() {
        const descendants = [];
        for (const child of this._children) {
            descendants.push(child);
            descendants.push(...child.getAllDescendants());
        }
        return descendants;
    }
    // Clone the element
    clone() {
        return QElement.fromConfig(this.toConfig());
    }
    // Enhanced methods for advanced features
    // Metadata management
    get metadata() {
        return { ...this._metadata };
    }
    updateMetadata(metadata) {
        this._metadata = { ...this._metadata, ...metadata, updatedAt: new Date() };
    }
    // Visibility and state management
    get isVisible() {
        return this._isVisible;
    }
    get isEnabled() {
        return this._isEnabled;
    }
    setVisible(visible) {
        this._isVisible = visible;
    }
    setEnabled(enabled) {
        this._isEnabled = enabled;
    }
    // Animation management
    addAnimation(name, animation) {
        this._animations.set(name, animation);
    }
    removeAnimation(name) {
        this._animations.delete(name);
    }
    getAnimation(name) {
        return this._animations.get(name);
    }
    getAllAnimations() {
        return Array.from(this._animations.values());
    }
    // Style validation
    validateStyle() {
        return this._validator.validate(this._style);
    }
    validateOverrides() {
        return this._validator.validate(this._overrides);
    }
    // Theme management
    applyTheme(themeName) {
        this._themeManager.setCurrentTheme(themeName);
    }
    getCurrentTheme() {
        return this._themeManager.getCurrentTheme().name;
    }
    // Responsive management
    getCurrentBreakpoint() {
        return this._responsiveManager.getCurrentBreakpoint();
    }
    createResponsiveStyles(responsiveStyles) {
        const responsiveStyle = this._responsiveManager.createResponsiveStyles(this._style, responsiveStyles);
        this.updateStyle(responsiveStyle);
    }
    // Advanced style operations
    mergeStyle(newStyle, deep = false) {
        if (deep) {
            this._style = this._deepMerge(this._style, newStyle);
        }
        else {
            this._style = { ...this._style, ...newStyle };
        }
    }
    _deepMerge(target, source) {
        const result = { ...target };
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this._deepMerge(target[key] || {}, source[key]);
            }
            else {
                result[key] = source[key];
            }
        }
        return result;
    }
    // Style inheritance control
    inheritFromParent(properties) {
        if (this._parent) {
            const parentStyle = this._parent.computedStyle;
            const inheritedStyle = {};
            properties.forEach(prop => {
                if (parentStyle[prop] !== undefined) {
                    inheritedStyle[prop] = parentStyle[prop];
                }
            });
            this.overrideStyle(inheritedStyle);
        }
    }
    // Style reset methods
    resetToParent() {
        this._overrides = {};
    }
    resetToDefault() {
        this._style = {};
        this._overrides = {};
    }
    // Performance and optimization
    getStyleHash() {
        const styleString = JSON.stringify(this.computedStyle);
        return this._hashString(styleString);
    }
    _hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }
    onStyleChange(listener) {
        this._styleChangeListeners.push(listener);
        return () => {
            const index = this._styleChangeListeners.indexOf(listener);
            if (index > -1) {
                this._styleChangeListeners.splice(index, 1);
            }
        };
    }
    _notifyStyleChange() {
        this._styleChangeListeners.forEach(listener => listener(this));
    }
    // Enhanced update methods that notify listeners
    updateStyle(newStyle) {
        this._style = { ...this._style, ...newStyle };
        this._notifyStyleChange();
    }
    overrideStyle(overrides) {
        this._overrides = { ...this._overrides, ...overrides };
        this._notifyStyleChange();
    }
}
