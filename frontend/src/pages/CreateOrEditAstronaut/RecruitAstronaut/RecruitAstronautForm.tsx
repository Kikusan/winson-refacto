// React
import { FormEvent, useState, useRef } from 'react';

// Libs
import classnames from 'classnames';

// Components
import { HUDWindow } from '@components/HUDWindow';
import { Form } from '@components/Form';
import { HUDInput } from '@components/HUDInput';
import { HUDButton } from '@components/HUDButton';
import { Flexbox } from '@components/Flexbox';

// Styles
import styles from '../AstronautForm.module.css';

import { Planet } from '@api/planet.api';
import { useNavigate } from 'react-router-dom';
import { useRecruitAstronaut } from './hooks/useRecruitAstronaut';
import { AstronautToCreate } from './services/AstronautToCreate';

type AstronautFormProps = {
  currentPlanet: Planet;
};

type FormStateType = {
  firstname?: string;
  lastname?: string;
};

export function RecruitAstronautForm({
  currentPlanet,
}: Readonly<AstronautFormProps>) {
  const componentClassNames = classnames(
    styles.astronautform,
    styles.createoreditastronautForm,
  );

  const canCreate = currentPlanet.isHabitable;

  const [formState, setFormState] = useState<FormStateType>({});

  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const handleCancel = () => navigate('/spaceship-admin');
  const { recruitAstronaut } = useRecruitAstronaut();
  const handleAstronautFormSubmit = async (astronaut: AstronautToCreate) => {
    await recruitAstronaut(astronaut);
    navigate('/spaceship-admin');
  };

  const validateAndSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormStateType = {};
    const astronautFirstname = firstnameRef.current?.value;
    const astronautLastname = lastnameRef.current?.value;

    if (astronautFirstname === '') {
      validationErrors.firstname = 'firstname is required';
    }
    if (astronautLastname === '') {
      validationErrors.lastname = 'lastname is require';
    }

    if (
      !Object.keys(validationErrors).length &&
      astronautFirstname &&
      astronautLastname
    ) {
      handleAstronautFormSubmit({
        firstname: astronautFirstname,
        lastname: astronautLastname,
        originPlanetId: currentPlanet.id,
      });
    } else {
      setFormState(validationErrors);
    }
  };

  return (
    <Flexbox className={componentClassNames} flexDirection="column">
      {canCreate ? (
        <HUDWindow>
          <h2>Create an Astronaut</h2>
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
              error={formState.firstname}
              ref={firstnameRef}
            />
            <HUDInput
              name="lastname"
              label="lastname"
              placeholder="Doe"
              required
              error={formState.lastname}
              ref={lastnameRef}
            />

            <Flexbox
              className={styles.astronautformButtons}
              alignItems="center"
              justifyContent="center"
            >
              <HUDButton onClick={handleCancel}>CANCEL</HUDButton>
              <HUDButton disabled={!canCreate}>CREATE</HUDButton>
            </Flexbox>
          </Form>
        </HUDWindow>
      ) : (
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
