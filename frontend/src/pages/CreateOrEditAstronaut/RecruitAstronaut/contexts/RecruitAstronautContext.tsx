import React, { createContext, ReactNode, useCallback, useMemo } from 'react';
import IRecruitAstronautService from '../services/IRecruitAstronautService';
import { Astronaut } from '@api/astronaut.api';
import { AstronautToCreate } from '../services/AstronautToCreate';

export interface ApiContextType {
  recruitAstronaut: (
    astronautToCreate: AstronautToCreate,
  ) => Promise<Astronaut>;
}

interface ApiProviderProps {
  service: IRecruitAstronautService;
  children: ReactNode;
}

export const RecruitAstronautContext = createContext<ApiContextType>({
  recruitAstronaut: () => {
    throw new Error('recruitAstronaut function must be implemented');
  },
});

export const RecruitAstronautProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const recruitAstronaut = useCallback(
    async (astronautToCreate: AstronautToCreate) => {
      return service.recruit(astronautToCreate);
    },
    [service],
  );

  const contextValue = useMemo(
    () => ({ recruitAstronaut }),
    [recruitAstronaut],
  );
  return (
    <RecruitAstronautContext.Provider value={contextValue}>
      {children}
    </RecruitAstronautContext.Provider>
  );
};
