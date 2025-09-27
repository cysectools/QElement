import { QElementStyle, QElementValidationRule, QElementValidationResult } from './types';

export class QElementValidator {
  private _rules: Map<string, QElementValidationRule[]> = new Map();
  private _globalRules: QElementValidationRule[] = [];

  constructor() {
    this._initializeDefaultRules();
  }

  private _initializeDefaultRules(): void {
    // Add default validation rules
    this.addGlobalRule({
      property: 'width',
      validator: (value) => {
        if (typeof value === 'number') return value >= 0;
        if (typeof value === 'string') {
          return /^(\d+(\.\d+)?(px|em|rem|%|vh|vw|auto))$/.test(value) || value === 'auto';
        }
        return false;
      },
      message: 'Width must be a positive number or valid CSS unit'
    });

    this.addGlobalRule({
      property: 'height',
      validator: (value) => {
        if (typeof value === 'number') return value >= 0;
        if (typeof value === 'string') {
          return /^(\d+(\.\d+)?(px|em|rem|%|vh|vw|auto))$/.test(value) || value === 'auto';
        }
        return false;
      },
      message: 'Height must be a positive number or valid CSS unit'
    });

    this.addGlobalRule({
      property: 'opacity',
      validator: (value) => {
        return typeof value === 'number' && value >= 0 && value <= 1;
      },
      message: 'Opacity must be a number between 0 and 1'
    });

    this.addGlobalRule({
      property: 'zIndex',
      validator: (value) => {
        return typeof value === 'number' && Number.isInteger(value);
      },
      message: 'Z-index must be an integer'
    });

    this.addGlobalRule({
      property: 'fontSize',
      validator: (value) => {
        if (typeof value === 'number') return value > 0;
        if (typeof value === 'string') {
          return /^(\d+(\.\d+)?(px|em|rem|%))$/.test(value);
        }
        return false;
      },
      message: 'Font size must be a positive number or valid CSS unit'
    });
  }

  // Add a validation rule for a specific property
  addRule(property: string, rule: QElementValidationRule): void {
    if (!this._rules.has(property)) {
      this._rules.set(property, []);
    }
    this._rules.get(property)!.push(rule);
  }

  // Add a global validation rule
  addGlobalRule(rule: QElementValidationRule): void {
    this._globalRules.push(rule);
  }

  // Remove a validation rule
  removeRule(property: string, ruleIndex: number): void {
    const rules = this._rules.get(property);
    if (rules && ruleIndex >= 0 && ruleIndex < rules.length) {
      rules.splice(ruleIndex, 1);
    }
  }

  // Remove a global validation rule
  removeGlobalRule(ruleIndex: number): void {
    if (ruleIndex >= 0 && ruleIndex < this._globalRules.length) {
      this._globalRules.splice(ruleIndex, 1);
    }
  }

  // Validate a style object
  validate(style: QElementStyle): QElementValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate each property
    Object.entries(style).forEach(([property, value]) => {
      // Check property-specific rules
      const propertyRules = this._rules.get(property) || [];
      propertyRules.forEach(rule => {
        if (!rule.validator(value)) {
          errors.push(`${property}: ${rule.message}`);
        }
      });

      // Check global rules
      this._globalRules.forEach(rule => {
        if (rule.property === property && !rule.validator(value)) {
          errors.push(`${property}: ${rule.message}`);
        }
      });

      // Add warnings for potentially problematic values
      this._addWarnings(property, value, warnings);
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Add warnings for potentially problematic values
  private _addWarnings(property: string, value: any, warnings: string[]): void {
    // Warning for very large values
    if (typeof value === 'number' && value > 10000) {
      warnings.push(`${property}: Very large value (${value}) may cause performance issues`);
    }

    // Warning for negative margins (can be intentional but worth noting)
    if (property === 'margin' && typeof value === 'number' && value < 0) {
      warnings.push(`${property}: Negative margin (${value}) may cause layout issues`);
    }

    // Warning for missing units on numeric values
    if (typeof value === 'number' && ['width', 'height', 'fontSize'].includes(property)) {
      warnings.push(`${property}: Numeric value (${value}) without unit will be treated as pixels`);
    }
  }

  // Validate a single property
  validateProperty(property: string, value: any): QElementValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check property-specific rules
    const propertyRules = this._rules.get(property) || [];
    propertyRules.forEach(rule => {
      if (!rule.validator(value)) {
        errors.push(`${property}: ${rule.message}`);
      }
    });

    // Check global rules
    this._globalRules.forEach(rule => {
      if (rule.property === property && !rule.validator(value)) {
        errors.push(`${property}: ${rule.message}`);
      }
    });

    // Add warnings
    this._addWarnings(property, value, warnings);

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  // Get all validation rules for a property
  getRules(property: string): QElementValidationRule[] {
    return this._rules.get(property) || [];
  }

  // Get all global validation rules
  getGlobalRules(): QElementValidationRule[] {
    return [...this._globalRules];
  }

  // Clear all rules
  clearRules(): void {
    this._rules.clear();
    this._globalRules = [];
  }

  // Clear rules for a specific property
  clearPropertyRules(property: string): void {
    this._rules.delete(property);
  }
}
