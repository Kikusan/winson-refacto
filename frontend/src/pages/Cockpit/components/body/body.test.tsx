import { act, render, screen } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import { FetchPlanetProvider } from '../../context/FetchPlanetContext.tsx';
import { BodyContainer } from './BodyContainer.tsx';
import { FakePlanetService } from '../../service/FakePlanetService';
import userEvent from '@testing-library/user-event';
import { SpaceTravelProvider } from '@contexts/SpaceTravelContext.tsx';

vi.mock('@assets/icon-planet.svg?react', () => ({
  default: 'svg',
}));
vi.mock('@assets/icon-male-female.svg?react', () => ({
  default: 'svg',
}));
describe('cockpit body component', () => {
  const planetService = new FakePlanetService();
  const planetNameList = planetService.planets.map((planet) => planet.name);
  it.each(planetNameList)('should display planet %s', async (planetName) => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );

    const planetList = await screen.findByText(planetName);
    expect(planetList).toBeInTheDocument();
  });
  it('should have a disabled hyperspace button', async () => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    await act(async () => {});
    const hyperspace = screen.getByRole('button');
    expect(hyperspace).toBeDisabled();
  });

  it('should have a enabled hyperspace button', async () => {
    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetService}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    const planet = await screen.findByText('pouloulou');
    await userEvent.click(planet);
    const hyperspace = screen.getByRole('button');
    expect(hyperspace).not.toBeDisabled();
  });

  it.each([
    {
      name: 'Donut Factory',
      img: '/assets/donut_factory.jpg',
      description: 'Forte en calories',
      life: 'shelters life',
    },
    {
      name: 'pouloulou',
      img: '/assets/pouloulou.jpg',
      description: 'Mi pou pooooou',
      life: 'No life on this planet',
    },
  ])(
    'should display data of $name on hyperspace click',
    async ({ name, img, description, life }) => {
      render(
        <SpaceTravelProvider>
          <FetchPlanetProvider service={planetService}>
            <BodyContainer />
          </FetchPlanetProvider>
        </SpaceTravelProvider>,
      );
      const planet = await screen.findByText(name);
      await userEvent.click(planet);
      const hyperspace = screen.getByRole('button');
      await userEvent.click(hyperspace);
      const planetImg = await screen.findByRole('img');
      expect(planetImg).toHaveAttribute('src', img);
      const planetDescription = await screen.findByText(description);
      expect(planetDescription).toBeInTheDocument();
      const lifePlanet = await screen.findByText(life);
      expect(lifePlanet).toBeInTheDocument();
    },
  );

  it('should display error message when service is down', async () => {
    const planetServiceFailure = new FakePlanetService(true);

    render(
      <SpaceTravelProvider>
        <FetchPlanetProvider service={planetServiceFailure}>
          <BodyContainer />
        </FetchPlanetProvider>
      </SpaceTravelProvider>,
    );
    const errorText = await screen.findByText(
      'FATAL ERROR: cannot load planet list from Eleven Labs space services.',
    );
    expect(errorText).toBeInTheDocument();
  });
});
