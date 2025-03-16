// React
import { CSSProperties } from 'react';

// Libs
import classnames from 'classnames';

// Components
import { HUDWindow } from '@components/HUDWindow';
import { HUDListItem } from '@components/HUDListItem';
import { Flexbox } from '@components/Flexbox';

// SVG
import IconPlanetSVG from '@assets/icon-planet.svg?react';

// Styles
import styles from './HUDPlanetList.module.css';

export type PlanetForList = {
  id: number;
  name: string;
  isCurrent?: boolean;
  isActive?: boolean;
};

type PlanetListProps = {
  className?: string;
  emptyPlanetListMessage: string;
  label?: string;
  onClick?: ((planet: Pick<PlanetForList, 'id' | 'name'>) => void) | null;
  planetList?: PlanetForList[];
  style?: CSSProperties;
};

export function HUDPlanetList({
  className,
  emptyPlanetListMessage,
  label,
  onClick = null,
  planetList = [],
  style,
}: Readonly<PlanetListProps>) {
  // Empty planet list
  if (!planetList.length) {
    return (
      <div className={className} style={style}>
        {label && <label className={styles.planetlistLabel}>{label}</label>}
        <HUDWindow className={styles.planetlistEmptyState}>
          {emptyPlanetListMessage}
        </HUDWindow>
      </div>
    );
  }

  return (
    <div className={className} style={style}>
      {label && <label className={styles.planetlistLabel}>{label}</label>}
      <HUDWindow>
        {planetList.map(
          (
            { id, name: planetName, isCurrent = false, isActive = false },
            planetListIndex,
          ) => {
            const isLastElement = planetListIndex + 1 === planetList.length;
            const classIsActive = classnames({
              [styles.planetlistItemActive]: isActive,
            });
            const handlePlanetClick = () =>
              onClick ? onClick({ id, name: planetName }) : null;

            return (
              <HUDListItem
                key={id}
                hasBorder={!isLastElement}
                onClick={handlePlanetClick}
                className={styles.planetlistItem}
                isActive={isActive}
              >
                <Flexbox
                  alignItems="center"
                  justifyContent="flex-start"
                  className={classIsActive}
                >
                  <IconPlanetSVG className={styles.planetlistIcon} />
                  <div>{planetName}</div>
                  {isCurrent && (
                    <div className={styles.planetlistCurrentPlanet}>
                      current
                    </div>
                  )}
                </Flexbox>
              </HUDListItem>
            );
          },
        )}
      </HUDWindow>
    </div>
  );
}
