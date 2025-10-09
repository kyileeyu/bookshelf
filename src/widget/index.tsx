import { BookRecord, BookRecordSchema } from "@/model/type";
import Layout from "@/Shared/components/Layout";
import BookInfo from "@/widget/BookInfo";
import Publish from "@/widget/Publish";
import Quote from "@/widget/Quote";
import Report from "@/widget/Report";
import { Rating } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFunnelStep } from "@/libs/useFurnelStep";

export const Index = () => {
  const form = useForm<BookRecord>({
    resolver: zodResolver(BookRecordSchema),
    mode: "onChange",
  });

  const { step, goNext, goBack } = useFunnelStep(form);

  const Step: Record<number, React.ComponentType> = {
    1: BookInfo,
    2: Rating,
    3: Report,
    4: Quote,
    5: Publish,
  };
  const CurrentStep = Step[step];

  return (
    <FormProvider {...form}>
      <Layout isFirstPage={step === 1} clickNext={goNext} clickPrev={goBack}>
        <CurrentStep />
      </Layout>
    </FormProvider>
  );
};

export default Index;
