import { BookRecord } from "@/model/type";
import { Stack, TextField } from "@mui/material";
import { useFormContext, Path, Controller } from "react-hook-form";

type InputWithErrorProps = {
  placeholder: string;
  name: Path<BookRecord>;
  type: string;
};

const InputWithError = ({ type, placeholder, name }: InputWithErrorProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookRecord>();

  // nested 필드 에러 접근
  const error = name.split(".").reduce((obj: any, key) => obj?.[key], errors);

  return (
    <Stack sx={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <TextField
              label={placeholder}
              {...field}
              type={type}
              placeholder={placeholder}
              fullWidth
              error={!!error}
              helperText={error?.message || ""}
            />
          );
        }}
      />
    </Stack>
  );
};

export default InputWithError;
