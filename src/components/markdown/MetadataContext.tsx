'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface MetadataContextType {
  metadata: Record<string, any>;
  setMetadata: (data: Record<string, any>) => void;
  clearMetadata: () => void;
}

const MetadataContext = createContext<MetadataContextType>({
  metadata: {},
  setMetadata: () => {},
  clearMetadata: () => {},
});

export function MetadataProvider({ children }: { children: React.ReactNode }) {
  const [metadata, setMetadataState] = useState<Record<string, any>>({});

  const setMetadata = useCallback((data: Record<string, any>) => {
    setMetadataState(prev => ({ ...prev, ...data }));
  }, []);

  const clearMetadata = useCallback(() => {
    setMetadataState({});
  }, []);

  return (
    <MetadataContext.Provider value={{ metadata, setMetadata, clearMetadata }}>
      {children}
    </MetadataContext.Provider>
  );
}

export function useMetadata() {
  return useContext(MetadataContext);
}