import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
import { QElementManager } from './QElementManager';
const QElementContext = createContext(null);
export const QElementProvider = ({ children }) => {
    const [manager] = useState(() => new QElementManager());
    const [, forceUpdate] = useState({});
    const triggerUpdate = useCallback(() => {
        forceUpdate({});
    }, []);
    const createElement = useCallback((id, style = {}) => {
        const element = manager.createElement(id, style);
        triggerUpdate();
        return element;
    }, [manager, triggerUpdate]);
    const updateParentStyle = useCallback((id, newStyle) => {
        manager.updateParentStyle(id, newStyle);
        triggerUpdate();
    }, [manager, triggerUpdate]);
    const overrideChildStyle = useCallback((id, overrides) => {
        manager.overrideChildStyle(id, overrides);
        triggerUpdate();
    }, [manager, triggerUpdate]);
    const resetChildOverrides = useCallback((id) => {
        manager.resetChildOverrides(id);
        triggerUpdate();
    }, [manager, triggerUpdate]);
    const getComputedStyle = useCallback((id) => {
        return manager.getComputedStyle(id);
    }, [manager]);
    const contextValue = {
        manager,
        createElement,
        updateParentStyle,
        overrideChildStyle,
        resetChildOverrides,
        getComputedStyle,
        forceUpdate: triggerUpdate
    };
    return (_jsx(QElementContext.Provider, { value: contextValue, children: children }));
};
export const useQElement = () => {
    const context = useContext(QElementContext);
    if (!context) {
        throw new Error('useQElement must be used within a QElementProvider');
    }
    return context;
};
