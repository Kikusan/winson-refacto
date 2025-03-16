import { FetchPlanetProvider } from '../../context/FetchPlanetContext.tsx';
import { PlanetService } from '../../service/planetService';
import { BodyContainer } from './BodyContainer.tsx';

export function Body() {
  const planetService = new PlanetService();
  return (
    <FetchPlanetProvider service={planetService}>
      <BodyContainer />
    </FetchPlanetProvider>
  );
}
