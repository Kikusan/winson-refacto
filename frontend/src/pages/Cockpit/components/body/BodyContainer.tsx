import { Flexbox } from '@components/Flexbox/index';
import { PlanetListErrorBoundary } from './PlanetListErrorBoundary';

import { PlanetSelectionContainer } from './PlanetSelectionContainer';
import { CurrentPlanetContainer } from './CurrentPlanetContainer';
import { Footer } from './footer';

export function BodyContainer() {
  return (
    <>
      <Flexbox flex="2 1 auto" alignItems="center">
        <PlanetListErrorBoundary>
          <PlanetSelectionContainer />
        </PlanetListErrorBoundary>
        <CurrentPlanetContainer />
      </Flexbox>
      <Footer />
    </>
  );
}
