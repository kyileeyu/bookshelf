import z from "zod";

export const BookRecordSchema = z.object({
  bookInfo: z.object({
    name: z.string().min(1, "책 제목을 입력해주세요."),
    page: z
      .number({ error: "숫자만 입력 가능합니다." })
      .min(1, "1페이지 이상 입력해주세요."),
  }),
  //2
  status: z.enum(["WANT", "READING", "READ", "PENDING"]),
  period: z.object({
    startDate: z.date(),
    endDate: z.date(),
  }),
  isRecommand: z.boolean(),
  rating: z.number().min(0).max(5),
  ratingReason: z.string().optional(),
  //3
  bookMemory: z.string().min(1, "한 줄 평을 입력해주세요."),
  //4
  quotes: z
    .array(
      z.object({
        page: z
          .number({ error: "숫자만 입력 가능합니다." })
          .min(1, "1페이지 이상 입력해주세요."),
        quote: z.string().min(1, "인용구를 입력해주세요."),
      })
    )
    .min(1, "인용구를 한 개 이상 작성해주세요."),
  //5
  isPublic: z.boolean(),
});

export type BookRecord = z.infer<typeof BookRecordSchema>;
