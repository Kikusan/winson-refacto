import { Perspective } from '@components/Perspective';
import { HUDPlanetList, PlanetForList } from './HUDPlanetList';
import { HUDWindowLoader } from '@components/HUDWindowLoader';
import {
  useCurrentPlanet,
  useSelectedPlanetForSpaceTravel,
} from '@contexts/SpaceTravelContext.tsx';
import { useMessageCenter } from '@contexts/MessageCenterContext.tsx';
import { Planet } from '@api/planet.api';
import styles from './PlanetSelectionContainer.module.css';
import { useFetchPlanet } from '../../../hooks/useFetchPlanet';

function mapPlanetListForHUDPlanetListComponent(
  planetList?: Planet[] | null,
  currentPlanet?: Planet,
  selectedPlanet?: Planet,
): PlanetForList[] {
  if (!planetList) {
    return [];
  }

  return planetList.map(({ id, name }: Planet) => ({
    id,
    name,
    isCurrent: currentPlanet?.id === id,
    isActive: selectedPlanet?.id === id,
  }));
}

export function PlanetSelectionContainer() {
  const { data, error } = useFetchPlanet();
  const { currentPlanet } = useCurrentPlanet();
  const { selectedPlanetForSpaceTravel, setSelectedPlanetForSpaceTravel } =
    useSelectedPlanetForSpaceTravel();
  const { pushErrorMessage } = useMessageCenter();

  if (error) {
    pushErrorMessage('Eleven Labs space services are not online...');
    throw error;
  }

  const handleSelectPlanetForTravel = (
    selectedPlanet: Pick<PlanetForList, 'id' | 'name'>,
  ) => {
    data?.forEach((planet: Planet) => {
      if (planet.id === selectedPlanet.id) {
        setSelectedPlanetForSpaceTravel(planet);
      }
    });
  };

  return (
    <Perspective
      value="900px"
      transform="rotateY(40deg)"
      className={styles.planetselectioncontainer}
    >
      {!data ? (
        <HUDWindowLoader
          label="planet list for travel"
          className="planetselectioncontainerLoader"
        />
      ) : (
        <HUDPlanetList
          planetList={mapPlanetListForHUDPlanetListComponent(
            data,
            currentPlanet,
            selectedPlanetForSpaceTravel,
          )}
          label="planet list for travel"
          onClick={handleSelectPlanetForTravel}
          emptyPlanetListMessage="Any planets available for travel"
        />
      )}
    </Perspective>
  );
}
