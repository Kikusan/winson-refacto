import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IRecruitAstronautService from '../services/IUpdateAstronautService';
import { Astronaut } from '../services/Astronaut';
import { AstronautToUpdate } from '../services/AstronautToUpdate';

export interface ApiContextType {
  updateAstronaut: (astronautToCreate: AstronautToUpdate) => Promise<Astronaut>;
  getById: (id: string) => Promise<Astronaut>;
}

interface ApiProviderProps {
  service: IRecruitAstronautService;
  children: ReactNode;
}

export const UpdateAstronautContext = createContext<ApiContextType>({
  updateAstronaut: () => {
    throw new Error('updateAstronaut function must be implemented');
  },
  getById: () => {
    throw new Error('getById function must be implemented');
  },
});

export const UpdateAstronautProvider: React.FC<ApiProviderProps> = ({ service, children }) => {
  const updateAstronaut = useCallback(
    async (astronautToUpdate: AstronautToUpdate) => {
      return service.update(astronautToUpdate);
    },
    [service],
  );

  const getById = useCallback(
    async (id: string) => {
      return service.getById(id);
    },
    [service],
  );

  const contextValue = useMemo(() => ({ updateAstronaut, getById }), [updateAstronaut, getById]);
  return <UpdateAstronautContext.Provider value={contextValue}>{children}</UpdateAstronautContext.Provider>;
};
