
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


## 과제 요구사항 체크리스트

### 단계별 폼
- [x] 1단계 - 도서 기본 정보, 독서 상태, 독서할 시작 및 종료일
- [x] 2단계 - 도서 추천 여부, 별점 (0~5, 0.5점 스케일)
- [x] 3단계 - 독후감
- [x] 4단계 - 인용구
- [x] 5단계 - 공개 여부

### 유효성 검증
- [x] 독서 상태 & 독서 기간 조건별 입력 제한
- [x] 독서 시작일/종료일 관계 및 출판일 이후 검증
- [x] 별점 1점/5점 시 독후감 100자 이상, 2~4점은 선택 입력
- [ ] 인용구 페이지 번호는 도서 전체 페이지 수보다 작아야 함

### 고민 포인트
- 유효성 검증 위치(각 단계 vs 마지막 단계) : 각 단계에서 유효성 검증
- 유효성 검증 메시지 표시 방식 : input 필드 하단
- 각 단계 상태 쿼리 파라미터 관리: 로컬 스토리지로 관리

### 심화 기능
- [x] 새로고침해도 폼 상태 유지
- [x] 실시간 앱 화면(500ms 딜레이)
- [x] 유효성 실패 시 첫 필드 focus, 붉은 outline, 하단 에러 메시지
- [ ] 인용구 여러개 등록/삭제 (rhf useFieldArray)
- [ ] 인용구 2개 이상 시 페이지 번호 인풋 required, 1개 이하 optional
- [ ] 페이지 번호 숫자만, 책 페이지 수 이하
- [x] window size event로 앱 화면 컨디셔널 렌더링(1024px 미만 앱 화면 없음)
- [ ] CommaSeparatedInput 컴포넌트 설계 및 rhf 매핑, 숫자 입력 시 1000단위 콤마, value는 number
- [ ] RHFCommaSeparatedInput: register 없이 재활용 가능
- [ ] Suspense 목록 api 응답으로 AutoComplete 옵션 구성 + rhf
- [ ] api 미응답 시 로딩바, 에러 시 rejectedFallback+서버 메시지, 정상 시 AutoComplete 노출
