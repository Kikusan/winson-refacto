import { useNavigate } from 'react-router-dom';
import { Flexbox } from '@components/Flexbox';
import { HUDButton } from '@components/HUDButton';
import { Perspective } from '@components/Perspective';
import IconSpaceship from '@assets/icon-spaceship.svg?react';
import styles from '../../Cockpit.module.css';

export function Header() {
  const navigate = useNavigate();
  const handleNavigateToSpaceshipAdminPage = () => navigate('/spaceship-admin');
  return (
    <Flexbox
      flex="1 1 auto"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <div className={styles.cockpitElevenLabsLogo}>Eleven Labs</div>
      <Perspective
        value="900px"
        transform="rotateY(-40deg)"
        className={styles.cockpitSpaceshipAdminButtonContainer}
      >
        <HUDButton onClick={handleNavigateToSpaceshipAdminPage}>
          <Flexbox justifyContent="center" alignItems="center">
            <IconSpaceship className={styles.cockpitSpaceshipAdminButtonIcon} />
            <div>Spaceship admin</div>
          </Flexbox>
        </HUDButton>
      </Perspective>
    </Flexbox>
  );
}
