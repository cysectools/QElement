import { QElement } from './QElement';
export class QElementManager {
    constructor() {
        this._elements = new Map();
        this._rootElements = [];
    }
    // Register an element
    register(element) {
        this._elements.set(element.id, element);
        if (!element.parent) {
            this._rootElements.push(element);
        }
    }
    // Unregister an element
    unregister(id) {
        const element = this._elements.get(id);
        if (element) {
            // Remove from parent if it has one
            if (element.parent) {
                element.parent.removeChild(element);
            }
            else {
                // Remove from root elements
                const index = this._rootElements.indexOf(element);
                if (index > -1) {
                    this._rootElements.splice(index, 1);
                }
            }
            this._elements.delete(id);
        }
    }
    // Get an element by ID
    getElement(id) {
        return this._elements.get(id) || null;
    }
    // Get all root elements
    getRootElements() {
        return [...this._rootElements];
    }
    // Get all elements
    getAllElements() {
        return Array.from(this._elements.values());
    }
    // Create a new element and register it
    createElement(id, style = {}) {
        const element = new QElement(id, style);
        this.register(element);
        return element;
    }
    // Update a parent element's style (affects all children)
    updateParentStyle(id, newStyle) {
        const element = this._elements.get(id);
        if (element) {
            element.updateStyle(newStyle);
        }
    }
    // Override a child element's style (only affects that child)
    overrideChildStyle(id, overrides) {
        const element = this._elements.get(id);
        if (element) {
            element.overrideStyle(overrides);
        }
    }
    // Reset a child's overrides
    resetChildOverrides(id) {
        const element = this._elements.get(id);
        if (element) {
            element.resetOverrides();
        }
    }
    // Get computed style for an element
    getComputedStyle(id) {
        const element = this._elements.get(id);
        return element ? element.computedStyle : null;
    }
    // Find element by ID (searches all elements)
    findElement(id) {
        return this._elements.get(id) || null;
    }
    // Clear all elements
    clear() {
        this._elements.clear();
        this._rootElements = [];
    }
    // Export all elements as configuration
    exportConfig() {
        return {
            rootElements: this._rootElements.map(element => element.toConfig())
        };
    }
    // Import elements from configuration
    importConfig(config) {
        this.clear();
        if (config.rootElements) {
            config.rootElements.forEach((elementConfig) => {
                const element = QElement.fromConfig(elementConfig);
                this.register(element);
            });
        }
    }
}
