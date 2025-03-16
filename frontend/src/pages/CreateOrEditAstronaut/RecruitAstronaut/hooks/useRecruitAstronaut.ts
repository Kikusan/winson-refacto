import { ApiContextType, RecruitAstronautContext } from '../contexts/RecruitAstronautContext.tsx';
import { useContext } from 'react';


export const useRecruitAstronaut = (): ApiContextType => {
  return useContext(RecruitAstronautContext);
};