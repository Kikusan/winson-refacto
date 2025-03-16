import { UpdateAstronautProvider } from './contexts/UpdateAstronautContext.tsx';
import { UpdateAstronautContainer } from './UpdateAstronautContainer.tsx';
import { UpdateAstronautService } from './services/UpdateAstronautService';
import { FetchPlanetProvider } from './contexts/fetchPlanetsContext.tsx';
import { FetchPlanetService } from './services/FetchPlanet';

export function UpdateAstronaut() {
  const recruitAstronautService = new UpdateAstronautService();
  const fetchPlanetService = new FetchPlanetService();
  return (
    <UpdateAstronautProvider service={recruitAstronautService}>
      <FetchPlanetProvider service={fetchPlanetService}>
        <UpdateAstronautContainer />;
      </FetchPlanetProvider>
    </UpdateAstronautProvider>
  );
}
