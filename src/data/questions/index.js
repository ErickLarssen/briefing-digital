import { identidadeVisualGroups } from './identidadeVisual';
import { landingPageGroups } from './landingPage';
import { siteInstitucionalGroups } from './siteInstitucional';
import { sistemaWebGroups } from './sistemaWeb';
import { aplicativoGroups } from './aplicativo';
import { motionDesignGroups } from './motionDesign';
import { modelagem3dGroups } from './modelagem3d';
import { socialMediaGroups } from './socialMedia';

// Mapa slug -> grupos de perguntas, usado pelo buildFlow para montar o fluxo completo.
export const nicheQuestionGroups = {
  'identidade-visual': identidadeVisualGroups,
  'landing-page': landingPageGroups,
  'site-institucional': siteInstitucionalGroups,
  'sistema-web': sistemaWebGroups,
  aplicativo: aplicativoGroups,
  'motion-design': motionDesignGroups,
  'modelagem-3d': modelagem3dGroups,
  'social-media': socialMediaGroups,
};
