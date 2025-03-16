import { ReturnToCockpitButton } from './components/ReturnToCockpitButton.tsx';
import { CurrentPlanet } from './components/CurrentPlanet.tsx';
import { RecruitAstronautButton } from './components/RecruitAstronautButton.tsx';

export function SpaceshipAdminHeaderContainer() {
  return (
    <>
      <ReturnToCockpitButton />
      <CurrentPlanet />
      <RecruitAstronautButton />
    </>
  );
}
