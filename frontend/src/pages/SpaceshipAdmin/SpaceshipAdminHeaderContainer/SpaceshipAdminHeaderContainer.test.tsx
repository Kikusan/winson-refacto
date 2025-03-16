import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpaceshipAdminHeaderContainer } from './SpaceshipAdminHeaderContainer.tsx';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { SpaceTravelProvider } from '@contexts/SpaceTravelContext.tsx';

// Mock de l'importation du fichier SVG
vi.mock('@assets/icon-male-female.svg?react', () => ({
  default: 'svg',
}));

vi.mock('@assets/icon-chevron-left.svg?react', () => ({
  default: 'svg',
}));

describe('admin header component', () => {
  it('should navigate to cockpit page when the button is clicked', async () => {
    const defaultCurrentPlanet = {
      id: 1,
      name: 'Donut Factory',
      isHabitable: true,
      description: 'Forte en calories',
      image: {
        path: '/assets/donut_factory.jpg',
        name: 'Donut Factory Image',
      },
    };
    render(
      <SpaceTravelProvider defaultCurrentPlanet={defaultCurrentPlanet}>
        <Router>
          <SpaceshipAdminHeaderContainer />
        </Router>
        ,
      </SpaceTravelProvider>,
    );
    const button = screen.getByText(/return to cockpit/i);
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/');
  });

  it('should navigate add astronaut page if planet is habitable', async () => {
    const defaultCurrentPlanet = {
      id: 1,
      name: 'Donut Factory',
      isHabitable: true,
      description: 'Forte en calories',
      image: {
        path: '/assets/donut_factory.jpg',
        name: 'Donut Factory Image',
      },
    };
    render(
      <SpaceTravelProvider defaultCurrentPlanet={defaultCurrentPlanet}>
        <Router>
          <SpaceshipAdminHeaderContainer />
        </Router>
        ,
      </SpaceTravelProvider>,
    );
    const button = screen.getByText(/create astronaut/i);
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/astronaut/create');
  });

  it('should hide the add astronaut button if planet is not habitable', async () => {
    render(
      <SpaceTravelProvider>
        <Router>
          <SpaceshipAdminHeaderContainer />
        </Router>
        ,
      </SpaceTravelProvider>,
    );
    const button = screen.queryAllByText(/create astronaut/i);
    expect(button).toHaveLength(0);
  });

  it('should display planet unknown if planet is not set', async () => {
    render(
      <SpaceTravelProvider>
        <Router>
          <SpaceshipAdminHeaderContainer />
        </Router>
        ,
      </SpaceTravelProvider>,
    );
    const unknownPlanet = screen.getByText(/current planet: Unknown/i);
    expect(unknownPlanet).toBeInTheDocument();
  });

  it('should display if planet is habitable', async () => {
    const defaultCurrentPlanet = {
      id: 1,
      name: 'Donut Factory',
      isHabitable: true,
      description: 'Forte en calories',
      image: {
        path: '/assets/donut_factory.jpg',
        name: 'Donut Factory Image',
      },
    };
    render(
      <SpaceTravelProvider defaultCurrentPlanet={defaultCurrentPlanet}>
        <Router>
          <SpaceshipAdminHeaderContainer />
        </Router>
        ,
      </SpaceTravelProvider>,
    );
    const button = screen.getByText(/create astronaut/i);
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/astronaut/create');
  });
});
