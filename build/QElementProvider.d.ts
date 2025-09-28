import React, { ReactNode } from 'react';
import { QElementManager } from './QElementManager';
import { QElement } from './QElement';
import { QElementStyle } from './types';
interface QElementContextType {
    manager: QElementManager;
    createElement: (id: string, style?: QElementStyle) => QElement;
    updateParentStyle: (id: string, newStyle: Partial<QElementStyle>) => void;
    overrideChildStyle: (id: string, overrides: Partial<QElementStyle>) => void;
    resetChildOverrides: (id: string) => void;
    getComputedStyle: (id: string) => QElementStyle | null;
    forceUpdate: () => void;
}
interface QElementProviderProps {
    children: ReactNode;
}
export declare const QElementProvider: React.FC<QElementProviderProps>;
export declare const useQElement: () => QElementContextType;
export {};
