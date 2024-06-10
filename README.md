# Footaku

Footaku는 사용자가 축구에 관한 게시물을 공유하고 상호작용할 수 있는 React와 Node.js로 구축된 웹 애플리케이션입니다. 이 프로젝트는 최신 웹 기술을 활용하여 매끄러운 사용자 경험을 제공합니다.

## 목차

- [설치](#설치)
- [주요 기능](#주요-기능)
- [사용법](#사용법)
- [API 문서](#api-문서)
- [기여하기](#기여하기)
- [라이선스](#라이선스)
- [연락처](#연락처)

## 설치

Footaku를 시작하려면 다음 단계를 따르세요:

### 필수 조건

- Node.js (v14.x 이상 권장)
- npm (v6.x 이상 권장)

### 백엔드 설정

1. 저장소 클론:
    ```bash
    git clone https://github.com/wlwhsxz/footaku.git
    cd footaku/backend
    ```

2. 종속성 설치:
    ```bash
    npm install
    ```

3. 환경 변수 설정:
    `backend` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
    ```env
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

4. 백엔드 서버 시작:
    ```bash
    npm run dev
    ```

### 프론트엔드 설정

1. `frontend` 디렉토리로 이동:
    ```bash
    cd ../frontend
    ```

2. 종속성 설치:
    ```bash
    npm install
    ```

3. 환경 변수 설정:
    `frontend` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 추가하세요:
    ```env
    REACT_APP_API_URL=http://localhost:5000
    ```

4. 프론트엔드 개발 서버 시작:
    ```bash
    npm start
    ```

### PM2를 사용한 프로덕션 환경 실행

1. PM2를 전역으로 설치:
    ```bash
    npm install -g pm2
    ```

2. PM2로 백엔드와 프론트엔드 시작:
    ```bash
    pm2 start ecosystem.config.js --env production
    ```

3. 로그를 확인하여 서버가 정상적으로 실행되는지 확인:
    ```bash
    pm2 logs
    ```

## 주요 기능

- **사용자 인증**: 회원 가입, 로그인 및 JWT를 통한 사용자 세션 관리.
- **게시물 생성 및 상호작용**: 게시물 작성, 좋아요 및 댓글 기능.
- **무한 스크롤**: 스크롤할 때 더 많은 게시물 로드.
- **반응형 디자인**: 모바일 친화적인 디자인.
- **SEO 최적화**: 콘텐츠 사전 로드 및 최적화.

## 사용법

프로젝트 설정을 완료한 후, 브라우저에서 `http://localhost:3000`을 열어 애플리케이션을 사용해보세요.

- **회원 가입/로그인**: 새로운 계정을 만들거나 기존 계정으로 로그인.
- **게시물 작성**: 축구에 관한 생각과 업데이트를 공유.
- **게시물 상호작용**: 다른 사용자의 게시물에 좋아요 및 댓글 작성.

## API 문서

백엔드는 애플리케이션과 상호작용할 수 있는 RESTful API를 제공합니다. 주요 엔드포인트는 다음과 같습니다:

- **사용자 인증**
  - `POST /api/auth/register`: 새로운 사용자 등록
  - `POST /api/auth/login`: 사용자 로그인
  - `POST /api/auth/refresh`: JWT 토큰 갱신

- **게시물**
  - `GET /api/posts`: 게시물 목록 가져오기
  - `POST /api/posts`: 새 게시물 작성
  - `GET /api/posts/:id`: 단일 게시물 가져오기
  - `PUT /api/posts/:id`: 게시물 업데이트
  - `DELETE /api/posts/:id`: 게시물 삭제

- **댓글**
  - `POST /api/posts/:id/comments`: 게시물에 댓글 추가
  - `GET /api/posts/:id/comments`: 게시물의 댓글 가져오기

## 기여하기

이 프로젝트에 기여해주시면 감사하겠습니다. 기여 방법은 다음과 같습니다:

1. 저장소를 포크
2. 새로운 브랜치 생성 (`git checkout -b feature/your-feature`)
3. 변경 사항 커밋 (`git commit -m 'Add some feature'`)
4. 브랜치 푸시 (`git push origin feature/your-feature`)
5. 풀 리퀘스트 생성

코드가 프로젝트의 코딩 표준을 준수하고 모든 테스트를 통과하는지 확인해 주세요.

## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

문의 사항이나 문제가 있으면 다음 연락처로 연락해 주세요:

- **이름**: [Your Name]
- **이메일**: [your.email@example.com]

또는 [GitHub 저장소](https://github.com/wlwhsxz/footaku/issues)에 이슈를 등록할 수 있습니다.
