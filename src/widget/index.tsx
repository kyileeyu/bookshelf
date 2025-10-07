import Layout from "@/Shared/components/Layout";
import BookInfo from "@/widget/BookInfo";
import Publish from "@/widget/Publish";
import Quote from "@/widget/Quote";
import Report from "@/widget/Report";
import { Rating } from "@mui/material";
import { useState } from "react";

export const Index = () => {
  const [step, setStep] = useState(1);
  //TODO: hook 으로 빼기
  const goNext = () => {
    //유효성 검사

    setStep((prev) => prev + 1);
  };
  const goBack = () => {
    setStep((prev) => prev - 1);
  };

  const Step: Record<number, React.ComponentType> = {
    1: BookInfo,
    2: Rating,
    3: Report,
    4: Quote,
    5: Publish,
  };
  const CurrentStep = Step[step];

  return (
    <>
      <Layout isFirstPage={step === 1} clickNext={goNext} clickPrev={goBack}>
        <CurrentStep />
      </Layout>
    </>
  );
};

export default Index;
