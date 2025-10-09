import { BookRecord } from "@/model/type";
import { Stack, Typography } from "@mui/material";
import { useFormContext, Path } from "react-hook-form";

type InputWithErrorProps = {
  placeholder: string;
  name: Path<BookRecord>;
  type: string;
};

const InputWithError = ({ type, placeholder, name }: InputWithErrorProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookRecord>();

  // nested 필드 에러 접근
  const error = name.split(".").reduce((obj: any, key) => obj?.[key], errors);

  return (
    <Stack>
      <input type={type} placeholder={placeholder} {...register(name)} />
      {error && <Typography color="error">{error.message}</Typography>}
    </Stack>
  );
};

export default InputWithError;
