import { Flexbox } from '@components/Flexbox';
import { Perspective } from '@components/Perspective';
import { TravelContainer } from './TravelContainer';

import styles from '../../../Cockpit.module.css';
export function Footer() {
  return (
    <Flexbox
      flexDirection="row"
      flex="1 1 auto"
      justifyContent="flex-end"
      alignItems="flex-end"
    >
      <Perspective
        value="900px"
        transform="rotateY(-40deg)"
        className={styles.cockpitHyperspaceButtonContainer}
      >
        <TravelContainer />
      </Perspective>
    </Flexbox>
  );
}
