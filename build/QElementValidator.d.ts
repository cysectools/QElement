import { QElementStyle, QElementValidationRule, QElementValidationResult } from './types';
export declare class QElementValidator {
    private _rules;
    private _globalRules;
    constructor();
    private _initializeDefaultRules;
    addRule(property: string, rule: QElementValidationRule): void;
    addGlobalRule(rule: QElementValidationRule): void;
    removeRule(property: string, ruleIndex: number): void;
    removeGlobalRule(ruleIndex: number): void;
    validate(style: QElementStyle): QElementValidationResult;
    private _addWarnings;
    validateProperty(property: string, value: any): QElementValidationResult;
    getRules(property: string): QElementValidationRule[];
    getGlobalRules(): QElementValidationRule[];
    clearRules(): void;
    clearPropertyRules(property: string): void;
}
