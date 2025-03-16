import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IfetchAstronautService from '../services/IFetchAstronautService';
import { Astronaut } from '../services/Astronaut';

export interface ApiContextType {
  fetchAstronauts: () => Promise<Astronaut[]>;
  deleteAstronaut: (id: number) => Promise<Astronaut[]>;
}

interface ApiProviderProps {
  service: IfetchAstronautService;
  children: ReactNode;
}

export const FetchAstronautContext = createContext<ApiContextType>({
  fetchAstronauts: async () => {
    throw new Error('Not implemented');
  },
  deleteAstronaut: async () => {
    throw new Error('Not implemented');
  },
});

export const FetchAstronautProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const fetchAstronauts = useCallback(async () => {
    return service.fetchAstronauts();
  }, [service]);

  const deleteAstronaut = useCallback(
    async (id: number) => {
      return service.deleteAstronaut(id);
    },
    [service],
  );

  const contextValue = useMemo(
    () => ({ fetchAstronauts, deleteAstronaut }),
    [fetchAstronauts, deleteAstronaut],
  );
  return (
    <FetchAstronautContext.Provider value={contextValue}>
      {children}
    </FetchAstronautContext.Provider>
  );
};
