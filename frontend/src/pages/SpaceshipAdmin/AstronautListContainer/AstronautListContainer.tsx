// Components
import { HUDAstronautList } from './components/HUDAstronautList/index';

import styles from './AstronautListContainer.module.css';
import { FetchAstronautProvider } from '../contexts/astronautContext.tsx';
import { AstronautService } from '../services/AstronautService';

export function AstronautListContainer() {
  const fetchAstronautService = new AstronautService();
  return (
    <FetchAstronautProvider service={fetchAstronautService}>
      <HUDAstronautList
        label="astronauts in the spaceship"
        className={styles.astronautlistcontainer}
        emptyAstronautListMessage="Any astronaut in your spaceship"
      />
    </FetchAstronautProvider>
  );
}
