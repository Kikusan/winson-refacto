// React
import { CSSProperties } from 'react';
import { HUDButton } from '@components/HUDButton';
import { waitMs } from '@helpers/waitMs';
import {
  useSelectedPlanetForSpaceTravel,
  useIsTraveling,
  useCurrentPlanet,
} from '@contexts/SpaceTravelContext.tsx';
import { useMessageCenter } from '@contexts/MessageCenterContext.tsx';

type TravelContainerProps = {
  style?: CSSProperties;
};

export function TravelContainer({ style }: Readonly<TravelContainerProps>) {
  const { selectedPlanetForSpaceTravel, setSelectedPlanetForSpaceTravel } =
    useSelectedPlanetForSpaceTravel();
  const { isTraveling, setIsTraveling } = useIsTraveling();
  const { setCurrentPlanet } = useCurrentPlanet();
  const { pushInfoMessage } = useMessageCenter();

  const handleLaunchTravel = async () => {
    pushInfoMessage(
      `Space Travel to ${selectedPlanetForSpaceTravel?.name} planet in progress ...`,
    );
    setIsTraveling(true);
    setCurrentPlanet(undefined);
    await waitMs(1000);
    if (selectedPlanetForSpaceTravel) {
      setCurrentPlanet(selectedPlanetForSpaceTravel);
      setSelectedPlanetForSpaceTravel(undefined);
    }
    setIsTraveling(false);
  };

  const isPlanetSelected = !selectedPlanetForSpaceTravel;

  return (
    <HUDButton
      size="xl"
      disabled={isPlanetSelected}
      isActive={isTraveling}
      style={style}
      onClick={handleLaunchTravel}
    >
      HYPERSPACE
    </HUDButton>
  );
}
