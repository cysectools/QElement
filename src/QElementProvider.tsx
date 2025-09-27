import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
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

const QElementContext = createContext<QElementContextType | null>(null);

interface QElementProviderProps {
  children: ReactNode;
}

export const QElementProvider: React.FC<QElementProviderProps> = ({ children }) => {
  const [manager] = useState(() => new QElementManager());
  const [, forceUpdate] = useState({});

  const triggerUpdate = useCallback(() => {
    forceUpdate({});
  }, []);

  const createElement = useCallback((id: string, style: QElementStyle = {}) => {
    const element = manager.createElement(id, style);
    triggerUpdate();
    return element;
  }, [manager, triggerUpdate]);

  const updateParentStyle = useCallback((id: string, newStyle: Partial<QElementStyle>) => {
    manager.updateParentStyle(id, newStyle);
    triggerUpdate();
  }, [manager, triggerUpdate]);

  const overrideChildStyle = useCallback((id: string, overrides: Partial<QElementStyle>) => {
    manager.overrideChildStyle(id, overrides);
    triggerUpdate();
  }, [manager, triggerUpdate]);

  const resetChildOverrides = useCallback((id: string) => {
    manager.resetChildOverrides(id);
    triggerUpdate();
  }, [manager, triggerUpdate]);

  const getComputedStyle = useCallback((id: string) => {
    return manager.getComputedStyle(id);
  }, [manager]);

  const contextValue: QElementContextType = {
    manager,
    createElement,
    updateParentStyle,
    overrideChildStyle,
    resetChildOverrides,
    getComputedStyle,
    forceUpdate: triggerUpdate
  };

  return (
    <QElementContext.Provider value={contextValue}>
      {children}
    </QElementContext.Provider>
  );
};

export const useQElement = (): QElementContextType => {
  const context = useContext(QElementContext);
  if (!context) {
    throw new Error('useQElement must be used within a QElementProvider');
  }
  return context;
};
