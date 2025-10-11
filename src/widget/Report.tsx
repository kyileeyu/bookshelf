import InputWithError from "@/Shared/components/InputWithError";
import { Stack, Typography } from "@mui/material";

const Report = () => {
  return (
    <Stack gap={2}>
      <Typography variant="h6">한 줄 평</Typography>

      <InputWithError
        type="text"
        placeholder="한 줄 평을 입력해주세요"
        name="bookMemory"
      />
    </Stack>
  );
};

export default Report;
