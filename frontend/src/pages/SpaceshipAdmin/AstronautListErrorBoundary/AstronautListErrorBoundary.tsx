// React
import { ReactNode } from 'react';

// Libs
import { ErrorBoundary } from 'react-error-boundary';

// Components
import { HUDWindowError } from '../../../components/HUDWindowError';

function HUDAstronautListError() {
  return (
    <HUDWindowError
      label="astronauts in the spaceship"
      error="FATAL ERROR: cannot load the list of astronaut of the spaceship from Eleven Labs space services."
    />
  );
}

type AstronautListErrorBoundaryProps = Readonly<{
  children: ReactNode;
}>;

export function AstronautListErrorBoundary({
  children,
}: AstronautListErrorBoundaryProps) {
  return (
    <ErrorBoundary FallbackComponent={HUDAstronautListError}>
      {children}
    </ErrorBoundary>
  );
}
