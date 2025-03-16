import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './index.tsx';
import { vi, describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock de l'importation du fichier SVG
vi.mock('@assets/icon-spaceship.svg?react', () => ({
  default: 'svg',
}));

describe('Cockpit header component', () => {
  it('should navigate to spaceship-admin page when the button is clicked', async () => {
    render(
      <Router>
        <Header />
      </Router>,
    );
    const button = screen.getByText(/Spaceship admin/i);
    await userEvent.click(button);
    expect(window.location.pathname).toBe('/spaceship-admin');
  });
});
