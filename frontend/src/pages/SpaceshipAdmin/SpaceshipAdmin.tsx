import { Flexbox } from '../../components/Flexbox';
import { AstronautListErrorBoundary } from './AstronautListErrorBoundary';

import { AstronautListContainer } from './AstronautListContainer';
import { SpaceshipAdminHeaderContainer } from './SpaceshipAdminHeaderContainer';

import styles from './SpaceshipAdmin.module.css';

export function SpaceshipAdmin() {
  return (
    <Flexbox className={styles.spaceshipadmin} flexDirection="column">
      <Flexbox justifyContent="center" alignItems="center">
        <SpaceshipAdminHeaderContainer />
      </Flexbox>
      <Flexbox justifyContent="center" alignItems="center">
        <AstronautListErrorBoundary>
          <AstronautListContainer />
        </AstronautListErrorBoundary>
      </Flexbox>
    </Flexbox>
  );
}
