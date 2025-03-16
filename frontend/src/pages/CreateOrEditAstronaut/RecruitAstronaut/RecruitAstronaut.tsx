import { RecruitAstronautProvider } from './contexts/RecruitAstronautContext.tsx';
import { RecruitAstronautContainer } from './RecruitAstronautContainer.tsx';
import { RecruitAstronautService } from './services/RecruitAstronautService';

export function RecruitAstronaut() {
  const recruitAstronautService = new RecruitAstronautService();
  return (
    <RecruitAstronautProvider service={recruitAstronautService}>
      <RecruitAstronautContainer />;
    </RecruitAstronautProvider>
  );
}
