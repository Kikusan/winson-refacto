import styles from '../SpaceshipAdminHeaderContainer.module.css';
import { HUDPlanetDescription } from '@components/HUDPlanetDescription';
import { HUDWindowWarning } from '@components/HUDWindowWarning';

import { useCurrentPlanet } from '@contexts/SpaceTravelContext.tsx';
export function CurrentPlanet() {
  const { currentPlanet } = useCurrentPlanet();
  return (
    <>
      {currentPlanet ? (
        <HUDPlanetDescription
          className={styles.spaceshipadminheaderPlanetDescription}
          name={`current planet: ${currentPlanet.name}`}
          isHabitable={currentPlanet.isHabitable}
        />
      ) : (
        <HUDWindowWarning
          className={styles.spaceshipadminheaderPlanetWarning}
          warning="current planet: Unknown"
        />
      )}
    </>
  );
}
