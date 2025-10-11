import z from "zod";

// 독서 상태 정의
export const BOOK_STATUS = {
  WANT: "읽고 싶은 책",
  READING: "읽고 있는 책",
  READ: "읽은 책",
  PENDING: "대기 중인 책",
} as const;

export const bookStatusEnum = ["WANT", "READING", "READ", "PENDING"] as const;

export const BookRecordSchema = z
  .object({
    bookInfo: z.object({
      name: z.string().min(1, "책 제목을 입력해주세요."),
      page: z.string().min(1, "페이지 수를 입력해주세요"),
      publishDate: z.string().optional(),
    }),
    status: z
      .union([z.literal(""), z.enum(bookStatusEnum)])
      .refine((val) => val !== "", {
        message: "상태를 선택해주세요",
      }),
    //1 date는 전송할때 Date타입으로 바꾸기
    period: z.object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
    }),
    //2
    isRecommand: z.boolean(),
    rating: z.number().min(1, "평점은 1점 이상이어야 합니다.").max(5),
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
  })
  .superRefine((data, ctx) => {
    const { status, period, bookInfo, rating, ratingReason, quotes } = data;

    // 읽고 싶은 책: 독서 기간 입력 불가
    if (status === "WANT") {
      if (period.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "읽고 싶은 책은 시작일을 입력할 수 없습니다.",
          path: ["period", "startDate"],
        });
      }
      if (period.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "읽고 싶은 책은 종료일을 입력할 수 없습니다.",
          path: ["period", "endDate"],
        });
      }
    }

    // 읽는 중: 시작일만 필수, 종료일 입력 불가
    if (status === "READING") {
      if (!period.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 시작일을 입력해주세요.",
          path: ["period", "startDate"],
        });
      }
      if (period.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "읽는 중인 책은 종료일을 입력할 수 없습니다.",
          path: ["period", "endDate"],
        });
      }
    }

    // 읽음: 시작일/종료일 둘 다 필수
    if (status === "READ") {
      if (!period.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 시작일을 입력해주세요.",
          path: ["period", "startDate"],
        });
      }
      if (!period.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 종료일을 입력해주세요.",
          path: ["period", "endDate"],
        });
      }
    }

    // 보류 중: 시작일만 필수, 종료일 입력 불가
    if (status === "PENDING") {
      if (!period.startDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 시작일을 입력해주세요.",
          path: ["period", "startDate"],
        });
      }
      if (period.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "보류 중인 책은 종료일을 입력할 수 없습니다.",
          path: ["period", "endDate"],
        });
      }
    }

    // 독서 시작일은 독서 종료일보다 이후면 안 된다
    if (period.startDate && period.endDate) {
      if (period.startDate > period.endDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 시작일은 종료일보다 이후일 수 없습니다.",
          path: ["period", "startDate"],
        });
      }
    }

    // 독서 시작일은 도서 출판일 이후여야 한다
    if (period.startDate && bookInfo.publishDate) {
      if (period.startDate < bookInfo.publishDate) {
        ctx.addIssue({
          code: "custom",
          message: "독서 시작일은 도서 출판일 이후여야 합니다.",
          path: ["period", "startDate"],
        });
      }
    }

    // 별점이 1점 또는 5점일 때 독후감 100자 이상 필수
    if (rating === 1 || rating === 5) {
      if (!ratingReason || ratingReason.length < 100) {
        ctx.addIssue({
          code: "custom",
          message:
            "1점 또는 5점의 경우 의견을 뒷받침하기 위해 100자 이상 작성해야 합니다.",
          path: ["ratingReason"],
        });
      }
    }

    // 인용구 페이지 번호는 도서 전체 페이지 수보다 작아야 한다
    quotes.forEach((quote, index) => {
      if (quote.page > bookInfo.page) {
        ctx.addIssue({
          code: "custom",
          message: `인용구 페이지 번호는 도서 전체 페이지 수(${bookInfo.page})보다 작아야 합니다.`,
          path: ["quotes", index, "page"],
        });
      }
    });
  });

export type BookRecord = z.infer<typeof BookRecordSchema>;
export const stepFields: Record<number, (keyof BookRecord)[]> = {
  1: ["bookInfo", "status", "period"],
  2: ["isRecommand", "rating", "ratingReason"],
  3: ["bookMemory"],
  4: ["quotes"],
  5: ["isPublic"],
};
