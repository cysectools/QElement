import { QElement } from './QElement';
import { QElementStyle } from './types';
export declare class QElementManager {
    private _elements;
    private _rootElements;
    register(element: QElement): void;
    unregister(id: string): void;
    getElement(id: string): QElement | null;
    getRootElements(): QElement[];
    getAllElements(): QElement[];
    createElement(id: string, style?: QElementStyle): QElement;
    updateParentStyle(id: string, newStyle: Partial<QElementStyle>): void;
    overrideChildStyle(id: string, overrides: Partial<QElementStyle>): void;
    resetChildOverrides(id: string): void;
    getComputedStyle(id: string): QElementStyle | null;
    findElement(id: string): QElement | null;
    clear(): void;
    exportConfig(): any;
    importConfig(config: any): void;
}
