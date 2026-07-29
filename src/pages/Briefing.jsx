import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBriefing } from '@/context/BriefingContext';
import { buildFlow } from '@/utils/buildFlow';
import NicheSelection from '@/components/briefing/NicheSelection';
import QuestionStep from '@/components/briefing/QuestionStep';
import UploadStep from '@/components/briefing/UploadStep';
import ReviewStep from '@/components/briefing/ReviewStep';
import Stepper from '@/components/ui/Stepper';
import PageContainer from '@/components/layout/PageContainer';

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

  if (currentStepIndex === 0 || !nicheSlug) {
    return (
      <PageContainer width="wide">
        <NicheSelection onSelect={handleSelectNiche} />
      </PageContainer>
    );
  }

  const groupIndex = currentStepIndex - 1;
  const isQuestionStep = groupIndex < flow.length;
  const isUploadStep = groupIndex === flow.length;
  const isReviewStep = groupIndex === flow.length + 1;

  return (
    <PageContainer>
      <div style={{ marginBottom: 'var(--space-6)' }}>
        <Stepper totalSteps={totalSteps} currentStep={currentStepIndex + 1} />
      </div>

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
  );
}

export default Briefing;
