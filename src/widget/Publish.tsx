import { BookRecord } from "@/model/type";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const Publish = () => {
  const { register } = useFormContext<BookRecord>();

  return (
    <Stack gap={2}>
      <Typography variant="h6">공개 설정</Typography>

      <FormControlLabel
        control={<Checkbox {...register("isPublic")} />}
        label="공개하시겠습니까?"
      />
    </Stack>
  );
};

export default Publish;
