import { QElementStyle, QElementConfig, QElementMetadata, QElementAnimation } from './types';
import { QElementValidator } from './QElementValidator';
import { QElementThemeManager } from './QElementTheme';
import { QElementResponsiveManager } from './QElementResponsive';

export class QElement {
  private _id: string;
  private _style: QElementStyle;
  private _parent: QElement | null = null;
  private _children: QElement[] = [];
  private _overrides: QElementStyle = {};
  private _metadata: QElementMetadata = {};
  private _animations: Map<string, QElementAnimation> = new Map();
  private _validator: QElementValidator;
  private _themeManager: QElementThemeManager;
  private _responsiveManager: QElementResponsiveManager;
  private _isVisible: boolean = true;
  private _isEnabled: boolean = true;

  constructor(
    id: string, 
    style: QElementStyle = {},
    metadata: QElementMetadata = {},
    validator?: QElementValidator,
    themeManager?: QElementThemeManager,
    responsiveManager?: QElementResponsiveManager
  ) {
    this._id = id;
    this._style = { ...style };
    this._metadata = { ...metadata };
    this._validator = validator || new QElementValidator();
    this._themeManager = themeManager || new QElementThemeManager();
    this._responsiveManager = responsiveManager || new QElementResponsiveManager();
  }

  get id(): string {
    return this._id;
  }

  get style(): QElementStyle {
    return this._style;
  }

  get parent(): QElement | null {
    return this._parent;
  }

  get children(): QElement[] {
    return [...this._children];
  }

  get overrides(): QElementStyle {
    return { ...this._overrides };
  }

  // Get the computed style (parent styles + overrides + theme + responsive)
  get computedStyle(): QElementStyle {
    const parentStyle = this._parent?.computedStyle || {};
    const baseStyle = { ...parentStyle, ...this._overrides };
    
    // Apply theme variables
    const themedStyle = this._themeManager.applyThemeVariables(baseStyle);
    
    // Apply responsive styles
    const responsiveStyle = this._responsiveManager.getResponsiveStyles(themedStyle);
    
    return responsiveStyle;
  }

  // Set parent element
  setParent(parent: QElement): void {
    if (this._parent) {
      this._parent.removeChild(this);
    }
    this._parent = parent;
    parent._children.push(this);
  }

  // Add child element
  addChild(child: QElement): void {
    child.setParent(this);
  }

  // Remove child element
  removeChild(child: QElement): void {
    const index = this._children.indexOf(child);
    if (index > -1) {
      this._children.splice(index, 1);
      child._parent = null;
    }
  }


  // Reset overrides to parent values
  resetOverrides(): void {
    this._overrides = {};
  }

  // Get a specific style property (with inheritance)
  getStyleProperty(property: string): any {
    const computed = this.computedStyle;
    return computed[property];
  }

  // Set a specific style property (as override)
  setStyleProperty(property: string, value: any): void {
    this.overrideStyle({ [property]: value });
  }

  // Convert to configuration object
  toConfig(): QElementConfig {
    return {
      id: this._id,
      style: this._style,
      children: this._children.map(child => child.toConfig())
    };
  }

  // Create from configuration
  static fromConfig(config: QElementConfig): QElement {
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
  findById(id: string): QElement | null {
    if (this._id === id) {
      return this;
    }
    for (const child of this._children) {
      const found = child.findById(id);
      if (found) return found;
    }
    return null;
  }

  // Get all descendants
  getAllDescendants(): QElement[] {
    const descendants: QElement[] = [];
    for (const child of this._children) {
      descendants.push(child);
      descendants.push(...child.getAllDescendants());
    }
    return descendants;
  }

  // Clone the element
  clone(): QElement {
    return QElement.fromConfig(this.toConfig());
  }

  // Enhanced methods for advanced features

  // Metadata management
  get metadata(): QElementMetadata {
    return { ...this._metadata };
  }

  updateMetadata(metadata: Partial<QElementMetadata>): void {
    this._metadata = { ...this._metadata, ...metadata, updatedAt: new Date() };
  }

  // Visibility and state management
  get isVisible(): boolean {
    return this._isVisible;
  }

  get isEnabled(): boolean {
    return this._isEnabled;
  }

  setVisible(visible: boolean): void {
    this._isVisible = visible;
  }

  setEnabled(enabled: boolean): void {
    this._isEnabled = enabled;
  }

  // Animation management
  addAnimation(name: string, animation: QElementAnimation): void {
    this._animations.set(name, animation);
  }

  removeAnimation(name: string): void {
    this._animations.delete(name);
  }

  getAnimation(name: string): QElementAnimation | undefined {
    return this._animations.get(name);
  }

  getAllAnimations(): QElementAnimation[] {
    return Array.from(this._animations.values());
  }

  // Style validation
  validateStyle(): { isValid: boolean; errors: string[]; warnings: string[] } {
    return this._validator.validate(this._style);
  }

  validateOverrides(): { isValid: boolean; errors: string[]; warnings: string[] } {
    return this._validator.validate(this._overrides);
  }

  // Theme management
  applyTheme(themeName: string): void {
    this._themeManager.setCurrentTheme(themeName);
  }

  getCurrentTheme(): string {
    return this._themeManager.getCurrentTheme().name;
  }

  // Responsive management
  getCurrentBreakpoint(): string {
    return this._responsiveManager.getCurrentBreakpoint();
  }

  createResponsiveStyles(responsiveStyles: { [breakpoint: string]: Partial<QElementStyle> }): void {
    const responsiveStyle = this._responsiveManager.createResponsiveStyles(this._style, responsiveStyles);
    this.updateStyle(responsiveStyle);
  }

  // Advanced style operations
  mergeStyle(newStyle: Partial<QElementStyle>, deep: boolean = false): void {
    if (deep) {
      this._style = this._deepMerge(this._style, newStyle);
    } else {
      this._style = { ...this._style, ...newStyle };
    }
  }

  private _deepMerge(target: any, source: any): any {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this._deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  // Style inheritance control
  inheritFromParent(properties: string[]): void {
    if (this._parent) {
      const parentStyle = this._parent.computedStyle;
      const inheritedStyle: QElementStyle = {};
      
      properties.forEach(prop => {
        if (parentStyle[prop] !== undefined) {
          inheritedStyle[prop] = parentStyle[prop];
        }
      });
      
      this.overrideStyle(inheritedStyle);
    }
  }

  // Style reset methods
  resetToParent(): void {
    this._overrides = {};
  }

  resetToDefault(): void {
    this._style = {};
    this._overrides = {};
  }

  // Performance and optimization
  getStyleHash(): string {
    const styleString = JSON.stringify(this.computedStyle);
    return this._hashString(styleString);
  }

  private _hashString(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  // Event system for style changes
  private _styleChangeListeners: ((element: QElement) => void)[] = [];

  onStyleChange(listener: (element: QElement) => void): () => void {
    this._styleChangeListeners.push(listener);
    return () => {
      const index = this._styleChangeListeners.indexOf(listener);
      if (index > -1) {
        this._styleChangeListeners.splice(index, 1);
      }
    };
  }

  private _notifyStyleChange(): void {
    this._styleChangeListeners.forEach(listener => listener(this));
  }

  // Enhanced update methods that notify listeners
  updateStyle(newStyle: Partial<QElementStyle>): void {
    this._style = { ...this._style, ...newStyle };
    this._notifyStyleChange();
  }

  overrideStyle(overrides: Partial<QElementStyle>): void {
    this._overrides = { ...this._overrides, ...overrides };
    this._notifyStyleChange();
  }
}
