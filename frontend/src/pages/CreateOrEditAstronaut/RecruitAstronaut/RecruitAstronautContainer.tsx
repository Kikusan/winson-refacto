// Components
import { HUDWindow } from '@components/HUDWindow';
import { Flexbox } from '@components/Flexbox';
import { RecruitAstronautForm } from './RecruitAstronautForm.tsx';
import { HUDPlanetDescription } from '@components/HUDPlanetDescription';
import { HUDWindowWarning } from '@components/HUDWindowWarning';

import { useCurrentPlanet } from '@contexts/SpaceTravelContext.tsx';

// Styles
import styles from '../CreateOrEditAstronaut.module.css';
import { HUDButton } from '@components/HUDButton/';
import { useNavigate } from 'react-router-dom';

export function RecruitAstronautContainer() {
  const navigate = useNavigate();
  const { currentPlanet } = useCurrentPlanet();
  const returnToCockpit = () => navigate('/');

  return (
    <Flexbox flexDirection="column" className={styles.createoreditastronaut}>
      {!currentPlanet ? (
        <HUDWindowWarning
          warning="current planet: UnKnown"
          className={styles.createoreditastronautCurrentPlanetWarning}
        />
      ) : (
        <HUDPlanetDescription
          name={`current planet: ${currentPlanet.name}`}
          isHabitable={currentPlanet.isHabitable}
          className={styles.createoreditastronautCurrentPlanet}
        />
      )}
      <Flexbox justifyContent="center" alignItems="center">
        {currentPlanet?.isHabitable ? (
          <RecruitAstronautForm currentPlanet={currentPlanet} />
        ) : (
          <HUDWindow className={styles.astronautformCannotCreate}>
            <h2>Warning !</h2>
            <p>
              Cannot create an astronaut because the current planet don't
              shelters life.
            </p>
            <p>Travel to an another planet to add an astronaut.</p>
            <HUDButton onClick={returnToCockpit}>Back</HUDButton>
          </HUDWindow>
        )}
      </Flexbox>
    </Flexbox>
  );
}
