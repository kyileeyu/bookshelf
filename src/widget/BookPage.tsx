import { useState } from "react";
import {
  BasicInfo,
  BookRecord,
  FunnelLayout,
  PublicOrNot,
  Quotes,
  Rating,
} from "@/features/bookRecord/ui";
import { FormProvider, useForm } from "react-hook-form";
import { BookRecordType } from "@/features/bookRecord/model/type";
import { useFormLocalStorage } from "@/features/bookRecord/model/useFormLocalStorage";
import { useStepMove } from "./useStepMove";

const BookPage = () => {
  const { funnelStep, nextStep, prevStep } = useStepMove();

  const methods = useForm<BookRecordType>({
    mode: "onChange",
    defaultValues: {
      // 초기값
      title: "",
      rating: 0,
      record: "",
      quotes: [],
      isPublic: false,
    },
  });

  useFormLocalStorage<BookRecordType>("bookForm", methods);

  const STEPS: Record<number, React.ComponentType> = {
    1: BasicInfo,
    2: Rating,
    3: BookRecord,
    4: Quotes,
    5: PublicOrNot,
  };

  const StepComponent = STEPS[funnelStep] ?? BasicInfo;

  return (
    <FormProvider {...methods}>
      <FunnelLayout step={funnelStep} onNext={nextStep} onPrev={prevStep}>
        <StepComponent />
      </FunnelLayout>
    </FormProvider>
  );
};

export default BookPage;
