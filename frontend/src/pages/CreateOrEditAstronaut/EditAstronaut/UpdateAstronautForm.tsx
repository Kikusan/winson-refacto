import { FormEvent, useState, useRef } from 'react';

import classnames from 'classnames';

import { HUDWindow } from '@components/HUDWindow';
import { Form } from '@components/Form';
import { HUDInput } from '@components/HUDInput';
import { HUDButton } from '@components/HUDButton';
import { Flexbox } from '@components/Flexbox';
import { Astronaut } from './services/Astronaut';

import styles from '../AstronautForm.module.css';
import { useNavigate } from 'react-router-dom';
import { useUpdateAstronaut } from './hooks/useUpdateAstronaut';
import { AstronautToUpdate } from './services/AstronautToUpdate';
import { PlanetAutoComplete } from './components/PlanetAutoComplete';
import { useFetchPlanet } from './hooks/useFetchPlanet';

type AstronautFormProps = {
  astronautForUpdate: Astronaut;
};

type FormStateType = {
  firstname?: string;
  lastname?: string;
  planet?: string;
};

export function UpdateAstronautForm({ astronautForUpdate }: Readonly<AstronautFormProps>) {
  const componentClassNames = classnames(styles.astronautform, styles.createoreditastronautForm);
  const navigate = useNavigate();
  const handleCancel = () => navigate('/spaceship-admin');
  const { updateAstronaut } = useUpdateAstronaut();
  const { fetchPlanets } = useFetchPlanet();
  const handleAstronautFormSubmit = async (astronaut: AstronautToUpdate) => {
    await updateAstronaut(astronaut);
    navigate('/spaceship-admin');
  };

  const [formState, setFormState] = useState<FormStateType>({});

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const originPlanetRef = useRef<HTMLInputElement>(null);

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormStateType = {};
    const astronautFirstname = firstnameRef.current?.value;
    const astronautLastname = lastnameRef.current?.value;
    const astronautOriginPlanet = originPlanetRef.current?.value;

    if (astronautFirstname === '') {
      validationErrors.firstname = 'firstname is required';
    }
    if (astronautLastname === '') {
      validationErrors.lastname = 'lastname is require';
    }
    if (astronautOriginPlanet === '') {
      validationErrors.planet = 'planet is require';
    }
    if (
      !Object.keys(validationErrors).length &&
      astronautFirstname &&
      astronautLastname &&
      astronautOriginPlanet
    ) {
      handleAstronautFormSubmit({
        id: astronautForUpdate.id,
        firstname: astronautFirstname,
        lastname: astronautLastname,
        originPlanetId: astronautOriginPlanet,
      });
    } else {
      setFormState(validationErrors);
    }
  };

  const astronautPlanet = {
    label: astronautForUpdate.originPlanet.name,
    value: astronautForUpdate.originPlanet.id.toString(),
  };

  return (
    <Flexbox className={componentClassNames} flexDirection="column">
      <HUDWindow>
        <h2>Edit an Astronaut number:{astronautForUpdate.id}</h2>
        <Form onSubmit={validateAndSubmit} className={styles.astronautformForm} noValidate>
          <HUDInput
            name="firstname"
            label="firstname"
            placeholder="John"
            required
            defaultValue={astronautForUpdate.firstname}
            error={formState.firstname}
            ref={firstnameRef}
          />
          <HUDInput
            name="lastname"
            label="lastname"
            placeholder="Doe"
            required
            defaultValue={astronautForUpdate.lastname}
            error={formState.lastname}
            ref={lastnameRef}
          />

          <PlanetAutoComplete
            name="astronautOriginPlanet"
            fieldLabel="Astronaut origin planet"
            placeholder="Tapez pour rechercher..."
            autoCompleteOptions={fetchPlanets}
            defaultValue={astronautPlanet}
            ref={originPlanetRef}
            error={undefined}
          />

          <Flexbox className={styles.astronautformButtons} alignItems="center" justifyContent="center">
            <HUDButton onClick={handleCancel}>CANCEL</HUDButton>
            <HUDButton>EDIT</HUDButton>
          </Flexbox>
        </Form>
      </HUDWindow>
    </Flexbox>
  );
}
