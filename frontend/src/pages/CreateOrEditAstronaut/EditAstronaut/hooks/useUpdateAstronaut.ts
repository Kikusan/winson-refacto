import { ApiContextType, UpdateAstronautContext } from '../contexts/UpdateAstronautContext.tsx';
import { useContext } from 'react';


export const useUpdateAstronaut = (): ApiContextType => {
  return useContext(UpdateAstronautContext);
};