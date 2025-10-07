export type BookRecord = {
  //1
  bookInfo: {
    name: string;
    page: number;
  };
  status: "WANT" | "READING" | "READ" | "PENDING";
  period: {
    startDate: Date;
    endDate: Date;
  };
  //2
  isRecommand: boolean;
  rating: number; // 0~5, 0.5점 스케일
  ratingReason?: string; // 1,5점일때 100자 이상 작성
  //3
  bookMemory: string;
  //4
  quotes: {
    page: number;
    quote: string;
  }[];
  //5
  isPublic: boolean;
};
