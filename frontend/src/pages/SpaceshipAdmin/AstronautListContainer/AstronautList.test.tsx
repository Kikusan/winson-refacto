import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { HUDAstronautList } from './components/HUDAstronautList/index';

import styles from './AstronautListContainer.module.css';
import { FetchAstronautProvider } from '../contexts/astronautContext.tsx';
import { FakeAstronautService } from '../services/FakeAstronautService';
import { AstronautListErrorBoundary } from '../AstronautListErrorBoundary/AstronautListErrorBoundary.tsx';

vi.mock('@assets/icon-square-edit.svg?react', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onClick }: any) => (
    <svg data-testid="icon-edit" onClick={onClick} />
  ),
}));

vi.mock('@assets/icon-trash-alt.svg?react', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ onClick }: any) => (
    <svg data-testid="icon-delete" onClick={onClick} />
  ),
}));

describe('admin astronaut list component', () => {
  const fetchAstronautService = new FakeAstronautService();
  const astronautNameList = fetchAstronautService.astronauts.map(
    (astronaut) => `${astronaut.firstname} ${astronaut.lastname}`,
  );
  it.each(astronautNameList)(
    'should display astronaut %s',
    async (astronautName) => {
      render(
        <Router>
          <FetchAstronautProvider service={fetchAstronautService}>
            <HUDAstronautList
              label="astronauts in the spaceship"
              className={styles.astronautlistcontainer}
              emptyAstronautListMessage="Any astronaut in your spaceship"
            />
          </FetchAstronautProvider>
        </Router>,
      );
      const astronaut = await screen.findByText(astronautName);
      expect(astronaut).toBeInTheDocument();
    },
  );

  it('should display error message', async () => {
    const fetchAstronautServiceFailure = new FakeAstronautService(true);
    render(
      <Router>
        <AstronautListErrorBoundary>
          <FetchAstronautProvider service={fetchAstronautServiceFailure}>
            <HUDAstronautList
              label="astronauts in the spaceship"
              className={styles.astronautlistcontainer}
              emptyAstronautListMessage="Any astronaut in your spaceship"
            />
          </FetchAstronautProvider>
        </AstronautListErrorBoundary>
      </Router>,
    );
    await act(async () => {});

    const errorText = await screen.findByText(
      'FATAL ERROR: cannot load the list of astronaut of the spaceship from Eleven Labs space services.',
    );
    expect(errorText).toBeInTheDocument();
  });

  it('should go to edit astronaut page on edit button', async () => {
    render(
      <Router>
        <FetchAstronautProvider service={fetchAstronautService}>
          <HUDAstronautList
            label="astronauts in the spaceship"
            className={styles.astronautlistcontainer}
            emptyAstronautListMessage="Any astronaut in your spaceship"
          />
        </FetchAstronautProvider>
      </Router>,
    );
    const astronautEditButton = await screen.findAllByTestId('icon-edit');
    await userEvent.click(astronautEditButton[0]);
    expect(window.location.pathname).toBe('/astronaut/edit/9');
  });

  it('should go to delete astronaut on delete button', async () => {
    render(
      <Router>
        <FetchAstronautProvider service={fetchAstronautService}>
          <HUDAstronautList
            label="astronauts in the spaceship"
            className={styles.astronautlistcontainer}
            emptyAstronautListMessage="Any astronaut in your spaceship"
          />
        </FetchAstronautProvider>
      </Router>,
    );
    const astronautDeleteButton = await screen.findAllByTestId('icon-delete');
    userEvent.click(astronautDeleteButton[3]);
    await waitFor(() => {
      expect(screen.queryByText('Bob koko')).toBeNull();
    });
  });
});
