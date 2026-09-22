import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import { buildFlow } from '@/utils/buildFlow';
import NicheSelection from '@/components/briefing/NicheSelection';
import QuestionStep from '@/components/briefing/QuestionStep';
import UploadStep from '@/components/briefing/UploadStep';
import ReviewStep from '@/components/briefing/ReviewStep';
import BriefingHeader from '@/components/briefing/BriefingHeader';
import Stepper from '@/components/ui/Stepper';
import PageContainer from '@/components/layout/PageContainer';
import styles from './Briefing.module.css';

function Briefing() {
  const { state, dispatch } = useBriefing();
  const { nicheSlug, currentStepIndex, answers, files } = state;
  const navigate = useNavigate();

  const flow = useMemo(() => buildFlow(nicheSlug), [nicheSlug]);
  const totalSteps = 3 + flow.length; // niche + perguntas + upload + revisão

  const handleSelectNiche = (slug) => dispatch({ type: 'SELECT_NICHE', nicheSlug: slug });
  const handleAnswer = (questionId, value) => dispatch({ type: 'ANSWER_QUESTION', questionId, value });
  const handleAddFiles = (newFiles) => dispatch({ type: 'ADD_FILES', files: newFiles });
  const handleRemoveFile = (fileId) => dispatch({ type: 'REMOVE_FILE', fileId });
  const handleNext = () => dispatch({ type: 'NEXT_STEP' });
  const handleBack = () => dispatch({ type: 'PREV_STEP' });

  function handleSubmitted() {
    dispatch({ type: 'RESET' });
    navigate('/sucesso');
  }

  const isNicheStep = currentStepIndex === 0 || !nicheSlug;
  const groupIndex = currentStepIndex - 1;
  const isQuestionStep = !isNicheStep && groupIndex < flow.length;
  const isUploadStep = !isNicheStep && groupIndex === flow.length;
  const isReviewStep = !isNicheStep && groupIndex === flow.length + 1;

  return (
    <div className={styles.page}>
      <BriefingHeader />

      <main className={styles.main}>
        <PageContainer width={isNicheStep ? 'wide' : 'default'}>
          {!isNicheStep && (
            <div className={styles.progress}>
              <Stepper totalSteps={totalSteps} currentStep={currentStepIndex + 1} />
            </div>
          )}

          {isNicheStep && <NicheSelection onSelect={handleSelectNiche} />}

          {isQuestionStep && (
            <QuestionStep
              key={groupIndex}
              group={flow[groupIndex]}
              answers={answers}
              onAnswer={handleAnswer}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {isUploadStep && (
            <UploadStep
              files={files}
              onAddFiles={handleAddFiles}
              onRemoveFile={handleRemoveFile}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {isReviewStep && (
            <ReviewStep
              nicheSlug={nicheSlug}
              answers={answers}
              files={files}
              onBack={handleBack}
              onSubmitted={handleSubmitted}
            />
          )}
        </PageContainer>
      </main>
    </div>
  );
}

export default Briefing;
