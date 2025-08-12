
## 독서 기록장

이 프로젝트는 Next.js 기반의 multi-step-form 예제입니다. 책 기록을 위한 폼을 단계별로 작성할 수 있도록 구성되어 있습니다.

## 폴더 구조

```
src/
	features/
		bookRecord/
			api/                # API 관련 파일 (현재 비어 있음)
			model/              # 타입 및 폼 데이터 로컬스토리지 관리
				├─ type.ts
				└─ useFormLocalStorage.ts
			ui/                 # UI 컴포넌트
				├─ BasicInfo.tsx
				├─ BookRecord.tsx
				├─ FunnelLayout.tsx
				├─ PublicOrNot.tsx
				├─ Quotes.tsx
				├─ Rating.tsx
				└─ index.tsx
	pages/                  # Next.js 페이지
		├─ _app.tsx
		├─ _document.tsx
		├─ book.tsx
		└─ index.tsx
	styles/
		└─ globals.css        # 글로벌 스타일
```

## 주요 기능
- 책 기록을 위한 다중 단계 폼
- 각 단계별로 정보 입력 및 관리
- 폼 데이터의 로컬스토리지 저장

## 시작하기

1. 의존성 설치
	 ```bash
	 pnpm install
	 ```
2. 개발 서버 실행
	 ```bash
	 pnpm dev
	 ```
3. 브라우저에서 `http://localhost:3000` 접속
