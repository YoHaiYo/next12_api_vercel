### 주소

- 배포주소 : https://next12apivercel.vercel.app/
- 배포된 api : https://next12apivercel.vercel.app/api/hello

### 개요

- next12 + vercel 로 무료api 서버 갖는 셈이다.
- 뿐만아니라 미니DB로 써도될듯. GET, POST, PUT, DELETE 다 됨.
- 그러나 메모리에 저장되는거라 서버 재시작 시 데이터 소실됨. DB에 저장하는것이 바람직함.

### 메모

- API 파일을 pages/api에 두는 이유: Next.js의 자동 라우팅 시스템 덕분에, API 엔드포인트로 쉽게 설정할 수 있기 때문입니다.
- 핸들러 임포트 필요 없음: Next.js가 요청이 들어올 때 자동으로 핸들러를 호출하므로, 사용자가 별도로 임포트할 필요가 없습니다.
