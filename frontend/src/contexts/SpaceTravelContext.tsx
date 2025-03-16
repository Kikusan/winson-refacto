// React
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

// Error
import { FetchError } from '../errors/FetchError';
import { ContextError } from '../errors/ContextError';

// API
import { Planet } from '../api/planet.api';

type SpaceTravelContextType = {
  isTraveling: boolean;
  selectedPlanetForSpaceTravel?: Planet;
  currentPlanet?: Planet;
  planetList: {
    isLoading: boolean;
    planetList?: Planet[] | null;
    error?: FetchError | null;
  };
  updateSpaceTravelContext: (
    stateToUpdate: Partial<SpaceTravelContextType>,
  ) => void;
};

const initialSpaceTravelContext: SpaceTravelContextType = {
  isTraveling: false,
  currentPlanet: undefined,
  planetList: {
    isLoading: false,
  },
  updateSpaceTravelContext: () => {},
};

const SpaceTravelContext = createContext(initialSpaceTravelContext);

export function SpaceTravelProvider({
  children,
  defaultCurrentPlanet,
}: Readonly<{ children: ReactNode; defaultCurrentPlanet?: Planet }>) {
  const [spaceTravelState, setSpaceTravelState] =
    useState<SpaceTravelContextType>({
      ...initialSpaceTravelContext,
      currentPlanet: defaultCurrentPlanet,
    });

  const updateSpaceTravelContext = useCallback(
    (stateToUpdate: Partial<SpaceTravelContextType>) => {
      setSpaceTravelState((prevState) => ({
        ...prevState,
        ...stateToUpdate,
      }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      ...spaceTravelState,
      updateSpaceTravelContext,
    }),
    [spaceTravelState, updateSpaceTravelContext],
  );

  return (
    <SpaceTravelContext.Provider value={value}>
      {children}
    </SpaceTravelContext.Provider>
  );
}

export function useSpaceTravelContext(): SpaceTravelContextType {
  const spaceTravelContext = useContext(SpaceTravelContext);

  if (!spaceTravelContext) {
    throw new ContextError(
      'SpaceTravelContext',
      'no SpaceTravelContext available, is the Provider was set ?',
    );
  }

  return spaceTravelContext;
}

export function useIsTraveling(): {
  isTraveling: SpaceTravelContextType['isTraveling'];
  setIsTraveling: (isTraveling: SpaceTravelContextType['isTraveling']) => void;
} {
  const { isTraveling, updateSpaceTravelContext } = useSpaceTravelContext();

  return {
    isTraveling,
    setIsTraveling: (isTraveling: SpaceTravelContextType['isTraveling']) =>
      updateSpaceTravelContext({ isTraveling }),
  };
}

export function useSelectedPlanetForSpaceTravel(): {
  selectedPlanetForSpaceTravel: SpaceTravelContextType['selectedPlanetForSpaceTravel'];
  setSelectedPlanetForSpaceTravel: (
    selectedPlanetForSpaceTravel: SpaceTravelContextType['selectedPlanetForSpaceTravel'],
  ) => void;
} {
  const { selectedPlanetForSpaceTravel, updateSpaceTravelContext } =
    useSpaceTravelContext();

  return {
    selectedPlanetForSpaceTravel,
    setSelectedPlanetForSpaceTravel: (
      selectedPlanetForSpaceTravel: SpaceTravelContextType['selectedPlanetForSpaceTravel'],
    ) => updateSpaceTravelContext({ selectedPlanetForSpaceTravel }),
  };
}

export function useCurrentPlanet(): {
  currentPlanet: SpaceTravelContextType['currentPlanet'];
  setCurrentPlanet: (
    currentPlanet: SpaceTravelContextType['currentPlanet'],
  ) => void;
} {
  const { currentPlanet, updateSpaceTravelContext } = useSpaceTravelContext();

  return {
    currentPlanet,
    setCurrentPlanet: (
      currentPlanet: SpaceTravelContextType['currentPlanet'],
    ) => updateSpaceTravelContext({ currentPlanet }),
  };
}

export function usePlanetList(): {
  planetList: SpaceTravelContextType['planetList'];
  setPlanetList: (planetList: SpaceTravelContextType['planetList']) => void;
} {
  const { planetList, updateSpaceTravelContext } = useSpaceTravelContext();
  const setPlanetList = useCallback(
    (planetListFromSpaceTravelContext: SpaceTravelContextType['planetList']) =>
      updateSpaceTravelContext({
        planetList: planetListFromSpaceTravelContext,
      }),
    [updateSpaceTravelContext],
  );
  return {
    planetList,
    setPlanetList,
  };
}
