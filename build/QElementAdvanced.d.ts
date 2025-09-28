import React from 'react';
import { QElementStyle, QElementProps } from './types';
interface QElementAdvancedProps extends QElementProps {
    elementId: string;
    as?: keyof JSX.IntrinsicElements;
    responsive?: {
        mobile?: Partial<QElementStyle>;
        tablet?: Partial<QElementStyle>;
        desktop?: Partial<QElementStyle>;
    };
    animations?: {
        [name: string]: {
            name: string;
            duration: number;
            timingFunction: string;
            delay?: number;
            iterationCount?: number | 'infinite';
            direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
            fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
        };
    };
    onStyleChange?: (style: QElementStyle) => void;
    onVisibilityChange?: (visible: boolean) => void;
    onEnabledChange?: (enabled: boolean) => void;
    performanceMonitoring?: boolean;
}
export declare const QElementAdvanced: React.FC<QElementAdvancedProps>;
export {};
