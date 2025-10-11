import { BookRecord } from "@/model/type";
import { Stack, TextField, SxProps, Theme } from "@mui/material";
import { useFormContext, Path, Controller } from "react-hook-form";

type InputWithErrorProps = {
  placeholder: string;
  name: Path<BookRecord>;
  type: string;
  sx?: SxProps<Theme>;
};

const InputWithError = ({
  type,
  placeholder,
  name,
  sx,
}: InputWithErrorProps) => {
  const { control } = useFormContext<BookRecord>();

  return (
    <Stack sx={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              label={placeholder}
              {...field}
              type={type}
              placeholder={placeholder}
              fullWidth
              error={!!fieldState.error}
              helperText={fieldState.error?.message || ""}
              sx={sx}
            />
          );
        }}
      />
    </Stack>
  );
};

export default InputWithError;
