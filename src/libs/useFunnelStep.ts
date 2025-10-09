import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { BookRecord, stepFields } from "@/model/type";

export const useFunnelStep = (form: UseFormReturn<BookRecord>) => {
  const [step, setStep] = useState(1);

  const goNext = async () => {
    // 현재 step의 필드들만 검증
    const fieldsToValidate = stepFields[step];
    const isValid = await form.trigger(fieldsToValidate);

    if (!isValid) {
      return; // 에러가 있으면 진행 안함
    }

    // localStorage 저장
    const currentData = form.getValues();
    localStorage.setItem("book-record-draft", JSON.stringify(currentData));

    setStep((prev) => prev + 1);
  };

  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  return { step, goNext, goBack };
};
