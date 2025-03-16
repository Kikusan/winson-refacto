import { HUDButton } from '@components/HUDButton';
import { useNavigate } from 'react-router-dom';
import { useCurrentPlanet } from '@contexts/SpaceTravelContext.tsx';

export function RecruitAstronautButton() {
  const navigate = useNavigate();
  const { currentPlanet } = useCurrentPlanet();
  const handleNavigateToCreateOrEditAstronaut = () =>
    navigate('/astronaut/create');
  return (
    <>
      {currentPlanet?.isHabitable ? (
        <HUDButton onClick={() => handleNavigateToCreateOrEditAstronaut()}>
          Create Astronaut
        </HUDButton>
      ) : null}
    </>
  );
}
