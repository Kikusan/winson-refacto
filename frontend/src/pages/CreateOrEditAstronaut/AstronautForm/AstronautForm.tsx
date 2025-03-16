// React
import { MouseEventHandler, FormEvent, useState, useRef } from 'react';

// Libs
import classnames from 'classnames';

// Components
import { HUDWindow } from '../../../components/HUDWindow';
import { Form } from '../../../components/Form';
import { HUDInput } from '../../../components/HUDInput';
import { HUDButton } from '../../../components/HUDButton';
import { Flexbox } from '../../../components/Flexbox';

// Context
import {
  useCurrentPlanet,
  usePlanetList,
  useSelectedPlanetForSpaceTravel,
} from '../../../contexts/SpaceTravelContext.tsx';

// API
import {
  CreateUpdateAstronautRequestBody,
  Astronaut,
} from '../../../api/astronaut.api';

// Styles
import styles from '../AstronautForm.module.css';
import {
  AutoCompleteOptionType,
  HUDAutoComplete,
} from '../../../components/HUDAutoComplete';
import { Planet } from '../../../api/planet.api';

type AstronautFormProps = {
  astronautForUpdate?: Astronaut | null;
  className?: string;
  mode?: string;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  onSubmit: (astronaut: CreateUpdateAstronautRequestBody) => void;
};

type FormStateType = {
  firstname?: string;
  lastname?: string;
  planet?: string;
};

export function AstronautForm({
  astronautForUpdate,
  className,
  mode = 'create',
  onCancel,
  onSubmit,
}: Readonly<AstronautFormProps>) {
  const componentClassNames = classnames(styles.astronautform, className);
  const { currentPlanet } = useCurrentPlanet();
  const canCreate = mode === 'create' && currentPlanet?.isHabitable;

  const [formState, setFormState] = useState<FormStateType>({});

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const originPlanetRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    console.log('enculé');
    e.preventDefault();
    const validationErrors: FormStateType = {};
    const astronautFirstname = firstnameRef.current?.value;
    const astronautLastname = lastnameRef.current?.value;
    let astronautOriginPlanet = originPlanetRef.current?.value;
    if (mode === 'create') {
      astronautOriginPlanet = currentPlanet?.id?.toString();
    }
    if (astronautFirstname === '') {
      validationErrors.firstname = 'firstname is required';
    }
    if (astronautLastname === '') {
      validationErrors.lastname = 'lastname is require';
    }
    if (astronautOriginPlanet === '') {
      validationErrors.planet = 'planet is require';
    }
    console.log(astronautFirstname, astronautLastname, astronautOriginPlanet);
    if (
      !Object.keys(validationErrors).length &&
      astronautFirstname &&
      astronautLastname &&
      astronautOriginPlanet
    ) {
      console.log('??');
      onSubmit({
        firstname: astronautFirstname,
        lastname: astronautLastname,
        originPlanetId: parseInt(astronautOriginPlanet),
      });
    } else {
      setFormState(validationErrors);
    }
  };
  const { planetList } = usePlanetList();

  const fetchOptions = async (
    searchTerm?: string,
  ): Promise<AutoCompleteOptionType[]> => {
    const planetOptions = planetList?.planetList?.map((planet: Planet) => ({
      label: planet.name,
      value: planet.id.toString(),
    }));

    return (
      planetOptions?.filter((option) =>
        option.label.toLowerCase().includes(searchTerm?.toLowerCase() ?? ''),
      ) || []
    );
  };

  const { selectedPlanetForSpaceTravel } = useSelectedPlanetForSpaceTravel();

  const astronautPlanet = () => {
    return {
      label:
        astronautForUpdate?.originPlanet?.name ??
        selectedPlanetForSpaceTravel?.name ??
        '',
      value:
        astronautForUpdate?.originPlanet?.id?.toString() ??
        selectedPlanetForSpaceTravel?.id?.toString() ??
        '',
    };
  };

  return (
    <Flexbox className={componentClassNames} flexDirection="column">
      <HUDWindow>
        {mode === 'create' ? (
          <h2>Create an Astronaut</h2>
        ) : (
          <h2>Edit an Astronaut</h2>
        )}
        <Form
          onSubmit={validateAndSubmit}
          className={styles.astronautformForm}
          noValidate
        >
          <HUDInput
            name="firstname"
            label="firstname"
            placeholder="John"
            required
            defaultValue={astronautForUpdate?.firstname ?? ''}
            error={formState.firstname}
            ref={firstnameRef}
          />
          <HUDInput
            name="lastname"
            label="lastname"
            placeholder="Doe"
            required
            defaultValue={astronautForUpdate?.lastname ?? ''}
            error={formState.lastname}
            ref={lastnameRef}
          />
          {mode !== 'create' ? (
            <HUDAutoComplete
              name="astronautOriginPlanet"
              label="Astronaut origin planet"
              placeholder="Tapez pour rechercher..."
              fetchOptions={fetchOptions}
              defaultValue={astronautPlanet()}
              ref={originPlanetRef}
              error={undefined}
            />
          ) : null}

          <Flexbox
            className={styles.astronautformButtons}
            alignItems="center"
            justifyContent="center"
          >
            <HUDButton onClick={onCancel}>CANCEL</HUDButton>
            {mode === 'create' ? (
              <HUDButton disabled={!canCreate}>CREATE</HUDButton>
            ) : (
              <HUDButton>EDIT</HUDButton>
            )}
          </Flexbox>
        </Form>
      </HUDWindow>
      {mode !== 'edit' && !canCreate && (
        <HUDWindow className={styles.astronautformCannotCreate}>
          <h2>Warning !</h2>
          <p>
            Cannot create an astronaut because the current planet don \'t
            shelters life.
          </p>
          <p>Travel to an another planet to add an astronaut.</p>
        </HUDWindow>
      )}
    </Flexbox>
  );
}
