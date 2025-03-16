import { Flexbox } from '@components/Flexbox';
import { UpdateAstronautForm } from './UpdateAstronautForm.tsx';

import styles from '../CreateOrEditAstronaut.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HUDWindowLoader } from '@components/HUDWindowLoader';
import { useUpdateAstronaut } from './hooks/useUpdateAstronaut';
import { Astronaut } from './services/Astronaut';

export function UpdateAstronautContainer() {
  const { astronautId } = useParams();
  const { getById } = useUpdateAstronaut();
  const [astronaut, setAstronaut] = useState<Astronaut>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getById(astronautId!);
        setAstronaut(response);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [getById, astronautId]);

  return (
    <Flexbox flexDirection="column" className={styles.createoreditastronaut}>
      <Flexbox justifyContent="center" alignItems="center">
        {!astronaut ? <HUDWindowLoader /> : <UpdateAstronautForm astronautForUpdate={astronaut} />}
      </Flexbox>
    </Flexbox>
  );
}
