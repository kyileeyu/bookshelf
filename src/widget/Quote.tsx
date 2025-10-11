import { BookRecord } from "@/model/type";
import InputWithError from "@/Shared/components/InputWithError";
import { Button, Stack, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

const Quote = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookRecord>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "quotes",
  });

  return (
    <Stack gap={2}>
      <Stack
        gap={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems="center">
        <Typography variant="h6">인용구</Typography>
        <Button
          variant="outlined"
          onClick={() => append({ page: 1, quote: "" })}>
          인용구 추가
        </Button>
      </Stack>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          gap={1}
          sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
          <Stack direction={"row"} sx={{ width: "100%" }} gap={2}>
            <InputWithError
              type="text"
              placeholder="인용구를 입력해주세요"
              name={`quotes.${index}.quote`}
            />
            <InputWithError
              type="number"
              sx={{ width: "50px" }}
              placeholder="P"
              name={`quotes.${index}.page`}
            />
          </Stack>

          <Button
            variant="outlined"
            color="error"
            onClick={() => remove(index)}>
            삭제
          </Button>
        </Stack>
      ))}

      {errors.quotes && (
        <Typography color="error">
          {typeof errors.quotes === "object" && "message" in errors.quotes
            ? errors.quotes.message
            : "인용구를 확인해주세요."}
        </Typography>
      )}
    </Stack>
  );
};

export default Quote;
