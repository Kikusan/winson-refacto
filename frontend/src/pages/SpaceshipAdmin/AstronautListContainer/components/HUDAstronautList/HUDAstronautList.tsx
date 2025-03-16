import { CSSProperties, useEffect, useState } from 'react';

import classnames from 'classnames';

import { HUDWindow } from '@components/HUDWindow';
import { HUDListItem } from '@components/HUDListItem';
import { Flexbox } from '@components/Flexbox';

import IconSquareEdit from '@assets/icon-square-edit.svg?react';
import IconTrashAlt from '@assets/icon-trash-alt.svg?react';

import styles from './HUDAstronautList.module.css';
import { useAstronaut } from '../../../hooks/useAstronauts';
import { useMessageCenter } from '@contexts/MessageCenterContext';
import { useNavigate } from 'react-router-dom';
import { Astronaut } from '../../../services/Astronaut';

type AstronautListProps = {
  className?: string;
  emptyAstronautListMessage: string;
  label?: string;
  style?: CSSProperties;
};

export function HUDAstronautList({
  className,
  emptyAstronautListMessage,
  label,
  style,
}: Readonly<AstronautListProps>) {
  const { fetchAstronauts, deleteAstronaut } = useAstronaut();
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();
  const { pushInfoMessage, pushErrorMessage } = useMessageCenter();
  const componentClassNames = classnames(styles.astronautlist, className);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchAstronauts();
        setAstronauts(response);
      } catch (err) {
        setError(err);
      }
    }
    fetchData();
  }, [fetchAstronauts]);

  const navigateToEditAstronaut = (astronautId: number) => {
    navigate(`/astronaut/edit/${astronautId}`);
  };

  if (error) {
    pushErrorMessage('Eleven Labs space services are not online ...');
    throw new Error();
  }

  const handleDeleteAstronaut = async (astronautId: number) => {
    try {
      const newAstronautList = await deleteAstronaut(astronautId);
      setAstronauts(newAstronautList);
      pushInfoMessage(
        'Astronaut has been deleted from Eleven Labs space service',
      );
    } catch (e) {
      pushErrorMessage('Deletion failed');
    }
  };

  if (!astronauts?.length) {
    return (
      <div className={componentClassNames} style={style}>
        {label && <label className={styles.astronautlistLabel}>{label}</label>}
        <HUDWindow className={styles.astronautlistEmptyState}>
          {emptyAstronautListMessage}
        </HUDWindow>
      </div>
    );
  }

  return (
    <div className={componentClassNames} style={style}>
      {label && <label className={styles.astronautlistLabel}>{label}</label>}
      <HUDWindow className={styles.astronautlistWindow}>
        <HUDListItem hasBorder>
          <Flexbox
            justifyContent="space-between"
            className={styles.astronautlistHeader}
          >
            <div>Name</div>
            <div>Planet</div>
            <div>Actions</div>
          </Flexbox>
        </HUDListItem>
        {astronauts.map(
          ({ id, firstname, lastname, originPlanet }, astronautListIndex) => {
            const isLastElement = astronautListIndex + 1 === astronauts.length;
            const handleAstronautEdit = () => navigateToEditAstronaut(id);
            const handleAstronautDelete = () => handleDeleteAstronaut(id);

            return (
              <HUDListItem hasBorder={!isLastElement} key={id}>
                <Flexbox
                  justifyContent="space-between"
                  className={styles.astronautlistContent}
                >
                  <div>
                    {firstname} {lastname}
                  </div>
                  <div>{originPlanet.name}</div>
                  <div className={styles.astronautlistActions}>
                    <IconSquareEdit onClick={handleAstronautEdit} />
                    <IconTrashAlt onClick={handleAstronautDelete} />
                  </div>
                </Flexbox>
              </HUDListItem>
            );
          },
        )}
      </HUDWindow>
    </div>
  );
}
