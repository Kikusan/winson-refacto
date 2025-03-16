import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from 'react';
import IPlanetService from '../service/IPlanetService';
import { Planet } from '../../../api/planet.api';

export interface ApiContextType {
  data: Planet[] | null;
  error: Error | null;
}

interface ApiProviderProps {
  service: IPlanetService;
  children: ReactNode;
}

export const FetchPlanetContext = createContext<ApiContextType>({
  data: null,
  error: null,
});

export const FetchPlanetProvider: React.FC<ApiProviderProps> = ({
  service,
  children,
}) => {
  const [data, setData] = useState<Planet[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await service.fetchPlanets();
        setData(result);
      } catch (err) {
        if (err instanceof Error) setError(err);
      }
    };

    fetchData();
  }, [service]);
  const contextValue = useMemo(() => ({ data, error }), [data, error]);

  return (
    <FetchPlanetContext.Provider value={contextValue}>
      {children}
    </FetchPlanetContext.Provider>
  );
};
