import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IFetchPlanets from '../services/IFetchPlanets';
import { PlanetItem } from '../services/Planet';

export interface ApiContextType {
  fetchPlanets: (searchName?: string) => Promise<PlanetItem[]>;
}

interface ApiProviderProps {
  service: IFetchPlanets;
  children: ReactNode;
}

export const FetchPlanetContext = createContext<ApiContextType>({
  fetchPlanets: async () => {
    throw new Error('Not implemented');
  },
});

export const FetchPlanetProvider: React.FC<ApiProviderProps> = ({ service, children }) => {
  const fetchPlanets = useCallback(
    async (searchName?: string) => {
      return service.fetchPlanets(searchName);
    },
    [service],
  );

  const contextValue = useMemo(() => ({ fetchPlanets }), [fetchPlanets]);
  return <FetchPlanetContext.Provider value={contextValue}>{children}</FetchPlanetContext.Provider>;
};
