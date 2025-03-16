// Components
import { HUDPlanetDescription } from '../HUDPlanetDescription';

// Context
import { useCurrentPlanet, useIsTraveling } from '@contexts/SpaceTravelContext.tsx';

// Styles
import styles from './CurrentPlanetContainer.module.css';

export function CurrentPlanetContainer() {
  const { currentPlanet } = useCurrentPlanet();
  const { isTraveling } = useIsTraveling();

  if (!currentPlanet || isTraveling) {
    return null;
  }

  const { name, description, isHabitable } = currentPlanet;

  return (
    <HUDPlanetDescription
      label="Current Planet Information"
      className={styles.currentplanetcontainer}
      imgSrc={''}
      name={name}
      description={description}
      isHabitable={isHabitable}
    />
  );
}
