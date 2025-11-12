<div align="center">

# 🌏 EnjoyTrip (Tripoline)

<img src="https://img.shields.io/badge/Vue.js-3.3.4-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js"/>
<img src="https://img.shields.io/badge/Vite-4.4.11-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
<img src="https://img.shields.io/badge/TailwindCSS-3.3.5-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
<img src="https://img.shields.io/badge/Pinia-2.1.7-FFD859?style=for-the-badge&logo=pinia&logoColor=black" alt="Pinia"/>

**대한민국 여행을 더 즐겁게, 더 편리하게**

[시연 영상](https://www.youtube.com/watch?v=XbaKYXYshVQ) · [프로젝트 소개](#-프로젝트-소개) · [기능](#-주요-기능) · [설치 및 실행](#-설치-및-실행)

</div>

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [설치 및 실행](#-설치-및-실행)
- [프로젝트 구조](#-프로젝트-구조)
- [API 문서](#-api-문서)
- [시연 영상](#-시연-영상)
- [팀원](#-팀원)

---

## 🎯 프로젝트 소개

**EnjoyTrip**은 대한민국 전역의 관광지 정보를 제공하고, 사용자가 여행 계획을 세우고 공유할 수 있는 종합 여행 플랫폼입니다.

### 🏆 프로젝트 성과

```
SSAFY 10기 관통 프로젝트 최우수상 수상
```

### 📅 프로젝트 기간

- **개발 기간**: 2023.10 ~ 2023.11
- **최종 발표**: 2023.11.24

---

## ✨ 주요 기능

### 🗺️ 관광지 검색 및 탐색
- 지역별, 카테고리별 관광지 검색
- 카카오 맵 API를 활용한 위치 기반 검색
- 관광지 상세 정보 및 사진 갤러리
- 즐겨찾기 기능

### 📝 여행 계획
- 드래그 앤 드롭으로 쉬운 일정 작성
- 일자별 관광지 추가 및 관리
- 여행 경로 지도 시각화
- 계획 공유 및 저장

### 💬 커뮤니티
- 여행 후기 및 정보 공유
- 카테고리별 게시판 (공지, 자유, 여행후기, 맛집)
- 댓글 및 좋아요 기능
- 베스트 게시글 추천
- 실시간 챗봇 지원 (Channel Talk)

### 🔍 부가 서비스
- 날씨 정보 조회
- 전기차 충전소 위치 검색
- 관광지 사진 갤러리
- 핫플레이스 추천

### 👤 회원 관리
- JWT 기반 인증/인가
- 프로필 이미지 업로드
- 마이페이지
- 관리자 페이지 (회원 관리)

---

## 🛠️ 기술 스택

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| Vue.js | 3.3.4 | UI 프레임워크 |
| Vite | 4.4.11 | 빌드 도구 |
| Pinia | 2.1.7 | 상태 관리 |
| Vue Router | 4.2.5 | 라우팅 |
| Axios | 1.6.1 | HTTP 클라이언트 |
| TailwindCSS | 3.3.5 | CSS 프레임워크 |
| Ant Design Vue | 4.0.7 | UI 컴포넌트 |
| Vuetify | 3.4.1 | Material UI |
| MSW | Latest | API 모킹 |

### Backend

| 기술 | 용도 |
|------|------|
| Spring Boot | 백엔드 프레임워크 |
| MyBatis | ORM |
| MySQL | 데이터베이스 |
| Swagger | API 문서화 |
| JWT | 인증/인가 |

### 협업 도구

- **형상 관리**: Git, GitLab
- **커뮤니케이션**: Mattermost
- **API 설계**: Swagger

---

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치 방법

```bash
# 저장소 클론
git clone https://github.com/JIINSUNG/EnjoyTripFrontEnd.git
cd EnjoyTripFrontEnd

# 의존성 설치
npm install
# 또는
yarn install
```

### 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_VUE_API_URL=http://localhost:8080/enjoytrip
VITE_PUBLIC_API=your_public_api_key
VITE_KAKAO_MAP_KEY=your_kakao_map_key
VITE_IMGBB_API=your_imgbb_api_key
VITE_CHATBOT_PLUGIN_KEY=your_channel_talk_key
```

### 개발 서버 실행

```bash
# 개발 서버 시작 (포트: 9000)
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:9000` 접속

### Mock 데이터로 실행

백엔드 서버 없이 MSW를 사용하여 Mock 데이터로 테스트할 수 있습니다:

```bash
npm run dev
```

개발 환경에서 자동으로 MSW가 활성화되어 Mock API를 사용합니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
EnjoyTripFrontEnd/
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 통신 모듈
│   │   ├── member.js
│   │   ├── board.js
│   │   ├── attraction.js
│   │   └── ...
│   ├── assets/            # 이미지, 폰트 등
│   ├── components/        # Vue 컴포넌트
│   │   ├── board/        # 게시판 관련
│   │   ├── member/       # 회원 관련
│   │   ├── plan/         # 여행 계획 관련
│   │   ├── attraction/   # 관광지 관련
│   │   └── layout/       # 레이아웃
│   ├── mocks/            # MSW Mock 데이터
│   │   ├── data/
│   │   ├── handlers.js
│   │   └── browser.js
│   ├── router/           # 라우터 설정
│   ├── stores/           # Pinia 스토어
│   ├── utils/            # 유틸리티 함수
│   ├── views/            # 페이지 컴포넌트
│   ├── App.vue
│   ├── main.js
│   └── index.css
├── .env                  # 환경 변수
├── package.json
└── vite.config.js
```

---

## 🌐 API 문서

### 사용 API 및 라이브러리

#### 공공 데이터 API

| API | 용도 |
|-----|------|
| [한국관광공사 TourAPI](http://api.visitkorea.or.kr) | 관광 데이터 |
| [공공데이터포털](https://www.data.go.kr) | 관광지/축제 정보 |
| [기상청 단기예보 서비스](http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0) | 날씨 정보 |
| [한국전력공사 전기차충전소](https://infuser.odcloud.kr/api/stages/38249/api-docs) | 충전소 정보 |

#### 외부 서비스

| 서비스 | 용도 |
|--------|------|
| [ImgBB](https://imgbb.com) | 이미지 호스팅 |
| [Channel Talk](https://channel.io) | 챗봇 서비스 |
| [Kakao Map API](https://apis.map.kakao.com) | 지도 서비스 |

---

## 🎬 시연 영상

### [📺 전체 시연 영상 보기](https://www.youtube.com/watch?v=XbaKYXYshVQ)

#### 타임라인

| 시간 | 내용 |
|------|------|
| 00:00 | 프로젝트 소개 |
| 00:47 | 로그인, 회원가입 |
| 01:20 | 메인화면 및 기능 간략 소개 |
| 03:08 | 챗봇 |
| 03:46 | 공지사항 |
| 04:30 | 게시판 |
| 05:18 | 게시판 접근제어 |
| 05:40 | 댓글, 좋아요, 조회수 |
| 06:16 | 글 작성 |
| 07:10 | 카테고리별 글 검색 |
| 07:25 | 베스트 글 보기 |
| 07:50 | 관광지검색 |
| 08:40 | 관광지 좋아요 |
| 09:22 | 여행 계획 |
| 11:25 | 여행 후기 |
| 12:35 | 핫플레이스 |
| 13:10 | 마이페이지 |
| 14:30 | 어드민페이지 |
| 15:54 | 날씨확인 |
| 16:15 | 전기차충전소 |
| 16:44 | 갤러리 기능 |
| 18:40 | 404 페이지 |
| 18:50 | 미로그인시 자동 리다이렉션 |

---

## 📊 시스템 설계

### Use Case Diagram

<details>
<summary>메인 화면</summary>

![메인화면](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/2056ccae-1004-4cf1-9b73-914ab13356da)

</details>

<details>
<summary>게시판</summary>

![게시판](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/5fc84826-a1c1-4dc1-802e-1989f1b8d388)

</details>

<details>
<summary>여행 계획</summary>

![여행계획](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/9584acab-32a8-4eeb-9449-3ec87ab2a8ab)

</details>

<details>
<summary>기본 관리</summary>

![기본관리](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/c642630e-10b0-4fc3-9b55-59088de77c71)

</details>

### ERD

<details>
<summary>데이터베이스 구조</summary>

![ERD](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/14af143e-b734-4cc7-a343-69cb16d2bcc5)

</details>

### Class Diagram

<details>
<summary>클래스 다이어그램</summary>

![클래스다이어그램](https://github.com/JIINSUNG/EnjoyTripFrontEnd/assets/49591292/1954ab49-aae4-476e-9e3c-63ea029834f0)

</details>

---

## 👥 팀원

<div align="center">

| 이름 | 역할 | GitHub | Email |
|------|------|--------|-------|
| 지인성 | 팀장, Frontend/Backend | [@JIINSUNG](https://github.com/JIINSUNG) | crm03008@gmail.com |
| 양유경 | Frontend/Backend | - | - |

</div>

---

## 📝 라이선스

이 프로젝트는 SSAFY 10기 관통 프로젝트의 일환으로 제작되었습니다.

---

## 📮 문의

프로젝트 관련 문의사항은 아래로 연락주시기 바랍니다.

- **Email**: crm03008@gmail.com
- **GitHub Issues**: [이슈 등록](https://github.com/JIINSUNG/EnjoyTripFrontEnd/issues)

---

<div align="center">

**Made with ❤️ by SSAFY 10기**

⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!

</div>
