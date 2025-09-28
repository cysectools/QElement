import React, { useEffect, useRef } from 'react';
import { useQElement } from './QElementProvider';
export const QElementComponent = ({ elementId, as: Component = 'div', children, className, style: inlineStyle, ...props }) => {
    const { getComputedStyle, manager } = useQElement();
    const elementRef = useRef(null);
    // Get the computed style from the QElement system
    const computedStyle = getComputedStyle(elementId);
    // Convert QElement style to CSS style object
    const convertToCSSStyle = (qStyle) => {
        const cssStyle = {};
        Object.entries(qStyle).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                // Convert camelCase to kebab-case for CSS properties
                const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                cssStyle[cssKey] = value;
            }
        });
        return cssStyle;
    };
    // Merge computed style with inline style
    const finalStyle = {
        ...(computedStyle ? convertToCSSStyle(computedStyle) : {}),
        ...inlineStyle
    };
    // Update the element in the manager if it doesn't exist
    useEffect(() => {
        if (!manager.getElement(elementId)) {
            manager.createElement(elementId);
        }
    }, [elementId, manager]);
    return React.createElement(Component, {
        ref: elementRef,
        className,
        style: finalStyle,
        'data-qelement-id': elementId,
        ...props
    }, children);
};
// Hook for managing QElement styles
export const useQElementStyle = (elementId) => {
    const { updateParentStyle, overrideChildStyle, resetChildOverrides, getComputedStyle } = useQElement();
    return {
        // Update parent style (affects all children)
        updateParent: (newStyle) => {
            updateParentStyle(elementId, newStyle);
        },
        // Override child style (only affects this element)
        override: (overrides) => {
            overrideChildStyle(elementId, overrides);
        },
        // Reset overrides to parent values
        reset: () => {
            resetChildOverrides(elementId);
        },
        // Get computed style
        getComputed: () => getComputedStyle(elementId)
    };
};
