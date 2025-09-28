import React from 'react';
import { QElementStyle, QElementProps } from './types';
interface QElementComponentProps extends QElementProps {
    elementId: string;
    as?: keyof JSX.IntrinsicElements;
}
export declare const QElementComponent: React.FC<QElementComponentProps>;
export declare const useQElementStyle: (elementId: string) => {
    updateParent: (newStyle: Partial<QElementStyle>) => void;
    override: (overrides: Partial<QElementStyle>) => void;
    reset: () => void;
    getComputed: () => QElementStyle | null;
};
export {};
