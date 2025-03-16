import { Flexbox } from '@components/Flexbox';
import { HUDButton } from '@components/HUDButton';
import { useNavigate } from 'react-router-dom';
import IconChevronLeft from '@assets/icon-chevron-left.svg?react';
import styles from '../SpaceshipAdminHeaderContainer.module.css';
export function ReturnToCockpitButton() {
  const navigate = useNavigate();
  const handleNavigateToCockpit = () => navigate('/');
  return (
    <HUDButton
      className={styles.spaceshipadminheaderReturnButton}
      onClick={handleNavigateToCockpit}
    >
      <Flexbox justifyContent="center" alignItems="center">
        <IconChevronLeft
          className={styles.spaceshipadminheaderReturnButtonIcon}
        />
        <div>return to cockpit</div>
      </Flexbox>
    </HUDButton>
  );
}
