import { ApiContextType, FetchPlanetContext } from '../contexts/fetchPlanetsContext.tsx';
import { useContext } from 'react';


export const useFetchPlanet = (): ApiContextType => {
  return useContext(FetchPlanetContext);
};