import { QElement } from './QElement';
import { QElementStyle } from './types';

export class QElementManager {
  private _elements: Map<string, QElement> = new Map();
  private _rootElements: QElement[] = [];

  // Register an element
  register(element: QElement): void {
    this._elements.set(element.id, element);
    if (!element.parent) {
      this._rootElements.push(element);
    }
  }

  // Unregister an element
  unregister(id: string): void {
    const element = this._elements.get(id);
    if (element) {
      // Remove from parent if it has one
      if (element.parent) {
        element.parent.removeChild(element);
      } else {
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
  getElement(id: string): QElement | null {
    return this._elements.get(id) || null;
  }

  // Get all root elements
  getRootElements(): QElement[] {
    return [...this._rootElements];
  }

  // Get all elements
  getAllElements(): QElement[] {
    return Array.from(this._elements.values());
  }

  // Create a new element and register it
  createElement(id: string, style: QElementStyle = {}): QElement {
    const element = new QElement(id, style);
    this.register(element);
    return element;
  }

  // Update a parent element's style (affects all children)
  updateParentStyle(id: string, newStyle: Partial<QElementStyle>): void {
    const element = this._elements.get(id);
    if (element) {
      element.updateStyle(newStyle);
    }
  }

  // Override a child element's style (only affects that child)
  overrideChildStyle(id: string, overrides: Partial<QElementStyle>): void {
    const element = this._elements.get(id);
    if (element) {
      element.overrideStyle(overrides);
    }
  }

  // Reset a child's overrides
  resetChildOverrides(id: string): void {
    const element = this._elements.get(id);
    if (element) {
      element.resetOverrides();
    }
  }

  // Get computed style for an element
  getComputedStyle(id: string): QElementStyle | null {
    const element = this._elements.get(id);
    return element ? element.computedStyle : null;
  }

  // Find element by ID (searches all elements)
  findElement(id: string): QElement | null {
    return this._elements.get(id) || null;
  }

  // Clear all elements
  clear(): void {
    this._elements.clear();
    this._rootElements = [];
  }

  // Export all elements as configuration
  exportConfig(): any {
    return {
      rootElements: this._rootElements.map(element => element.toConfig())
    };
  }

  // Import elements from configuration
  importConfig(config: any): void {
    this.clear();
    if (config.rootElements) {
      config.rootElements.forEach((elementConfig: any) => {
        const element = QElement.fromConfig(elementConfig);
        this.register(element);
      });
    }
  }
}
