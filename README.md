# Footaku

Footaku는 사용자가 축구에 관한 게시물을 공유하고 상호작용할 수 있는 React와 Node.js로 구축된 웹 애플리케이션입니다. 이 프로젝트는 최신 웹 기술을 활용하여 매끄러운 사용자 경험을 제공합니다.

## 목차

- [설치](#설치)
- [주요 기능](#주요-기능)
- [사용법](#사용법)
- [API 문서](#api-문서)
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


## 라이선스

이 프로젝트는 MIT 라이선스에 따라 라이선스가 부여됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 연락처

문의 사항이나 문제가 있으면 다음 연락처로 연락해 주세요:

- **이름**: [이민우]
- **이메일**: [wlwhsxz@gmail.com]

또는 [GitHub 저장소](https://github.com/wlwhsxz/footaku/issues)에 이슈를 등록할 수 있습니다.
