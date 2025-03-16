import { server } from './mockApi'; // server avec MSW
import { AstronautService } from './AstronautService';
import { beforeAll, afterAll, it, expect } from 'vitest';

beforeAll(() => server.listen()); // Démarre le serveur MSW avant les tests
afterAll(() => server.close()); // Ferme le serveur après tous les tests

it('should fetch astronauts', async () => {
  const astronautService = new AstronautService();
  const astronauts = await astronautService.fetchAstronauts();

  expect(astronauts).toHaveLength(3);
  expect(astronauts[0].firstname).toBe('Johnny');
});

it('should delete an astronaut', async () => {
  const astronautService = new AstronautService();
  const astronautsAfterDelete = await astronautService.deleteAstronaut(1);
  expect(astronautsAfterDelete).toHaveLength(3);
  expect(astronautsAfterDelete[0].firstname).toBe('Johnny');

});
