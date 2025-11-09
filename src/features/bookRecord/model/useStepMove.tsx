import { useState } from "react";

export const useStepMove = () => {
  const [funnelStep, setFunnelStep] = useState<number>(1);

  const nextStep = () => setFunnelStep((s) => Math.min(s + 1, 5));
  const prevStep = () => setFunnelStep((s) => Math.max(s - 1, 1));

  return { funnelStep, nextStep, prevStep };
};
