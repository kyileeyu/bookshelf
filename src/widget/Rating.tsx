import { BookRecord } from "@/model/type";
import InputWithError from "@/Shared/components/InputWithError";
import {
  Checkbox,
  FormControlLabel,
  Rating as MuiRating,
  Stack,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const Rating = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<BookRecord>();

  return (
    <Stack gap={2}>
      <Typography variant="h6">평가</Typography>

      <FormControlLabel
        control={<Checkbox {...register("isRecommand")} />}
        label="추천하시겠습니까?"
      />

      <Stack gap={1}>
        <Typography>평점 (~5)</Typography>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <MuiRating
              {...field}
              precision={0.5}
              max={5}
              value={field.value || 1}
              onChange={(_, value) => field.onChange(value || 1)}
            />
          )}
        />
        {errors.rating && (
          <Typography color="error">{errors.rating.message}</Typography>
        )}
      </Stack>

      <InputWithError type="text" placeholder="평점 이유" name="ratingReason" />
    </Stack>
  );
};

export default Rating;
