import { ApiContextType, FetchAstronautContext } from '../contexts/astronautContext.tsx';

import { useContext } from 'react';


export const useAstronaut = (): ApiContextType => {
  return useContext(FetchAstronautContext);
};