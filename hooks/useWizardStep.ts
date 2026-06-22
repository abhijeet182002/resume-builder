'use client';
import { useUIStore } from '@/store/uiStore';

const TOTAL_STEPS = 7;

export function useWizardStep() {
  const { wizardStep, setWizardStep } = useUIStore();

  const next = () => {
    if (wizardStep < TOTAL_STEPS) setWizardStep(wizardStep + 1);
  };

  const prev = () => {
    if (wizardStep > 1) setWizardStep(wizardStep - 1);
  };

  const goTo = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) setWizardStep(step);
  };

  return {
    step: wizardStep,
    totalSteps: TOTAL_STEPS,
    isFirst: wizardStep === 1,
    isLast: wizardStep === TOTAL_STEPS,
    next,
    prev,
    goTo,
  };
}
