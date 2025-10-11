# React Hook Form & Zod 학습 정리

## 1. defaultValues가 필요한 이유

### react-hook-form에서 defaultValues의 역할

```tsx
useForm({
  defaultValues: {
    email: '',
    age: 0
  }
})
```

**필요한 이유:**
1. **초기 상태 설정**: 폼 필드의 초기값 정의
2. **Controlled Component 유지**: uncontrolled → controlled 전환 방지
3. **타입 안정성**: TypeScript에서 폼 데이터 구조를 명확히 정의
4. **리셋 기능**: `reset()` 메서드가 이 값을 기준으로 초기화
5. **수정 모드**: 기존 데이터 편집 시 현재 값 미리 채우기

---

## 2. Controlled vs Uncontrolled Component

### Controlled Component
```tsx
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```
- `value` prop이 **정의된 값** (문자열, 숫자 등)
- React state가 input 값을 완전히 제어

### Uncontrolled Component
```tsx
<input value={undefined} />
<input />
```
- `value` prop이 **undefined** 또는 **null**
- DOM이 자체적으로 값을 관리

### 문제: uncontrolled → controlled 전환

```tsx
// ❌ 문제
const [name, setName] = useState();  // undefined

<input value={name} onChange={(e) => setName(e.target.value)} />
// 처음: value={undefined} → uncontrolled
// 타이핑 후: value="a" → controlled
// React 경고 발생!
```

```tsx
// ✅ 해결
const [name, setName] = useState('');  // 빈 문자열

<input value={name} onChange={(e) => setName(e.target.value)} />
// 항상 controlled 유지
```

### React가 자동으로 controlled로 바꾸지 않는 이유

1. **명시적 의도**: 개발자가 의도를 명확히 표현해야 함
2. **성능**: Uncontrolled는 더 빠름 (re-render 불필요)
3. **예측 가능성**: 자동 추론하지 않고 경고로 알려줌

---

## 3. undefined vs null vs 빈 문자열

### 값이 없음을 표현하는 방법

```tsx
// undefined: "아직 정의 안 됨" (암묵적)
page: undefined

// null: "값이 의도적으로 없음" (명시적)
page: null

// 빈 문자열: "비어있는 문자열 값"
page: ""
```

### 실무 권장사항

```tsx
defaultValues: {
  name: "",           // 문자열 → 빈 문자열
  page: "",           // 숫자 input → 빈 문자열 (HTML input은 문자열 반환)
  publishDate: "",    // 날짜 input → 빈 문자열
}
```

**이유:**
- MUI TextField는 `value={undefined}`를 uncontrolled로 인식
- HTML input은 항상 문자열 반환
- controlled 상태 보장

---

## 4. Zod Schema 설계: Validation vs UI 초기화

### 관심사 분리

```tsx
// ❌ 나쁜 예: Schema에 defaultValues 혼재
const schema = z.object({
  email: z.string().default(''),
  age: z.number().default(0)
})

// ✅ 좋은 예: 분리
// type.ts - Validation만
const schema = z.object({
  email: z.string(),
  age: z.number()
})

// index.tsx - UI 초기화
const defaultValues = {
  email: '',
  age: 0
}
```

### 분리하는 이유

| 측면 | Zod Schema | defaultValues |
|------|-----------|---------------|
| 책임 | "이 데이터가 유효한가?" | "폼을 어떻게 초기화할까?" |
| 관심사 | 비즈니스 규칙, Validation | UI 상태 관리 |
| 변경 시점 | 데이터 검증 로직 변경 | 신규/수정 모드 전환 |
| 재사용성 | 같은 schema, 다른 초기값 가능 | 컨텍스트별 다른 초기값 |

---

## 5. Zod의 coerce vs transform

### coerce (내장 변환)

```tsx
z.coerce.number()
// "123" → 123
// "" → 0
// "abc" → NaN
```

**장점:**
- 간결함
- 의도 명확
- Zod 공식 권장

### transform (커스텀 변환)

```tsx
z.string()
  .transform((val) => val === "" ? undefined : Number(val))
  .pipe(z.number().min(1))
```

**장점:**
- 세밀한 제어
- 빈 문자열 특별 처리
- 복잡한 변환 로직

### 실제 적용 예시

```tsx
// 페이지 수: 문자열 → 숫자 변환
page: z
  .string()
  .min(1, "페이지 수를 입력해주세요.")
  .transform((val) => Number(val))
  .pipe(z.number().min(1, "1페이지 이상 입력해주세요."))

// 날짜: 빈 문자열은 undefined로
publishDate: z
  .string()
  .transform((val) => val === "" ? undefined : new Date(val))
  .pipe(z.date().optional())
```

---

## 6. Controller의 field vs fieldState

### field (필드 제어)

```tsx
field = {
  name: "bookInfo.page",
  value: 123,
  onChange: (e) => {...},
  onBlur: () => {...},
  ref: inputRef
}
```

**역할:** input을 제어하기 위한 props
**사용법:** `<TextField {...field} />`

### fieldState (필드 상태)

```tsx
fieldState = {
  invalid: true,
  isTouched: true,
  isDirty: true,
  error: {
    type: "min",
    message: "1페이지 이상 입력해주세요."
  }
}
```

**역할:** validation 상태 확인
**사용법:** 조건부 렌더링, 에러 표시

### 실제 사용 예시

```tsx
<Controller
  name="bookInfo.page"
  control={control}
  render={({ field, fieldState }) => (
    <TextField
      {...field}                          // 필드 제어
      error={!!fieldState.error}          // 에러 상태
      helperText={fieldState.error?.message}  // 에러 메시지
    />
  )}
/>
```

---

## 7. formState.errors vs fieldState.error

### formState.errors (전역)

```tsx
const { formState: { errors } } = useFormContext();

errors.bookInfo?.page?.message  // 전체 폼의 모든 에러
```

- **범위:** 전체 폼
- **타입 안정성:** 낮음 (optional chaining 필요)
- **사용처:** 커스텀 에러 표시

### fieldState.error (로컬)

```tsx
<Controller
  name="bookInfo.page"
  render={({ field, fieldState }) => {
    fieldState.error?.message  // 현재 필드만
  }}
/>
```

- **범위:** 현재 필드만
- **타입 안정성:** 높음 (자동 필터링)
- **사용처:** Controller 내부

**권장:** `Controller` 내부에선 `fieldState.error` 사용

---

## 8. value={field.value ?? ""} 논쟁

### 문제 상황

```tsx
// defaultValues에 undefined 사용
defaultValues: {
  page: undefined
}

// Controller에서
<TextField
  {...field}
  value={field.value ?? ""}  // 왜 필요?
/>
```

### 해결책: defaultValues를 빈 문자열로

```tsx
// ✅ 더 나은 방법
defaultValues: {
  page: ""  // 빈 문자열
}

// Controller에서
<TextField {...field} />  // ?? "" 불필요
```

### 관심사 분리 관점

- `value={field.value ?? ""}`: **UI 렌더링 문제** (React의 controlled 요구사항)
- `z.coerce.number()`: **데이터 변환 문제** (폼 제출 시 validation)

**결론:**
- UI 렌더링 문제는 `defaultValues`에서 해결 (빈 문자열 사용)
- 데이터 변환은 Zod에서 해결 (`transform` 사용)
- `value={field.value ?? ""}`는 임시방편, 근본 해결은 `defaultValues` 수정

---

## 9. 최종 권장 패턴

### index.tsx (UI 초기화)

```tsx
useForm<BookRecord>({
  resolver: zodResolver(BookRecordSchema),
  mode: "onChange",
  defaultValues: {
    bookInfo: {
      name: "",
      page: "",           // 빈 문자열
      publishDate: "",    // 빈 문자열
    },
    status: "WANT",
    period: {
      startDate: "",      // 빈 문자열
      endDate: "",        // 빈 문자열
    },
    // ...
  }
})
```

### type.ts (Validation + 변환)

```tsx
export const BookRecordSchema = z.object({
  bookInfo: z.object({
    name: z.string().min(1, "책 제목을 입력해주세요."),
    page: z
      .string()
      .min(1, "페이지 수를 입력해주세요.")
      .transform((val) => Number(val))
      .pipe(z.number().min(1, "1페이지 이상 입력해주세요.")),
    publishDate: z
      .string()
      .transform((val) => val === "" ? undefined : new Date(val))
      .pipe(z.date().optional()),
  }),
  // ...
})
```

### InputWithError.tsx (UI 컴포넌트)

```tsx
const InputWithError = ({ type, placeholder, name }: InputWithErrorProps) => {
  const { control } = useFormContext<BookRecord>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          label={placeholder}
          {...field}
          type={type}
          fullWidth
          error={!!fieldState.error}
          helperText={fieldState.error?.message || ""}
        />
      )}
    />
  );
};
```

---

## 핵심 요약

1. **defaultValues는 필수**: controlled component 유지를 위해
2. **빈 문자열 사용**: `undefined` 대신 `""` (HTML input 호환)
3. **관심사 분리**:
   - Zod = Validation
   - defaultValues = UI 초기화
   - `value={field.value ?? ""}` = 임시방편 (근본 해결은 defaultValues 수정)
4. **Controller 내부**: `fieldState.error` 사용 (타입 안전)
5. **데이터 변환**: Zod의 `transform` 활용 (문자열 → 숫자/날짜)
