import { BookRecord } from "@/model/type";
import InputWithError from "@/Shared/components/InputWithError";
import { Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const BookInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<BookRecord>();
  return (
    <Stack gap={2}>
      <Typography variant="h6">기본 정보</Typography>

      <InputWithError type="text" placeholder="책 제목" name="bookInfo.name" />

      <InputWithError
        type="number"
        placeholder="페이지 수"
        name="bookInfo.page"
      />

      {/* status */}
      <select {...register("status")}>
        <option value="WANT">읽고 싶은 책</option>
        <option value="READING">읽고 있는 책</option>
        <option value="READ">읽은 책</option>
        <option value="PENDING">대기 중인 책</option>
      </select>
      {errors.status && (
        <Typography color="error">{errors.status.message}</Typography>
      )}

      <InputWithError
        type="date"
        placeholder="읽기 시작일"
        name="period.startDate"
      />
      <InputWithError
        type="date"
        placeholder="읽기 종료일"
        name="period.endDate"
      />
    </Stack>
  );
};

export default BookInfo;
