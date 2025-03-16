// React
import { CSSProperties } from 'react';

// Components
import { HUDWindow } from '@components/HUDWindow';
import { Flexbox } from '@components/Flexbox';

// SVG
import IconMaleFemale from '@assets/icon-male-female.svg?react';

// Styles
import styles from './HUDPlanetDescription.module.css';

type PlanetDescriptionProps = {
  className?: string;
  description?: string;
  isHabitable?: boolean;
  imgSrc?: string;
  label?: string;
  name: string;
  style?: CSSProperties;
};

export function HUDPlanetDescription({
  className,
  description,
  isHabitable = false,
  imgSrc,
  label,
  name,
  style,
}: Readonly<PlanetDescriptionProps>) {
  return (
    <div className={className} style={style}>
      {label && (
        <label className={styles.planetdescriptionLabel}>{label}</label>
      )}
      <Flexbox justifyContent="space-around" alignItems="center">
        {imgSrc && (
          <img
            src={imgSrc}
            className={styles.planetdescriptionImage}
            alt={name}
          />
        )}
        <HUDWindow className={styles.planetdescriptionWindow}>
          <h3 className={styles.planetdescriptionName}>{name}</h3>
          {description && (
            <div className={styles.planetdescriptionDescription}>
              {description}
            </div>
          )}
          <Flexbox
            justifyContent="center"
            alignItems="center"
            className={styles.planetdescriptionStatus}
          >
            <IconMaleFemale className={styles.planetdescriptionIcon} />
            {isHabitable ? (
              <div>shelters life</div>
            ) : (
              <div>No life on this planet</div>
            )}
          </Flexbox>
        </HUDWindow>
      </Flexbox>
    </div>
  );
}
