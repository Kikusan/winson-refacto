import { ApiContextType, FetchPlanetContext } from '../context/FetchPlanetContext.tsx';

import { useContext } from 'react';


export const useFetchPlanet = (): ApiContextType => {
  return useContext(FetchPlanetContext);
};