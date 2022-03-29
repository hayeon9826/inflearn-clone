## 구현 설명

### 1. 세팅

- `yarn start`로 백엔드, `yarn dev`로 프론트엔드 서버 실행

```
yarn start
yarn dev
```

- `localhost:8080`접속

### 2. 프로젝트 구조

- 프론트엔드 파일은 모두 `frontend` 폴더에 생성
- 첫 페이지는 `frontend/src/index.html`에 있는 강의 리스트 페이지가 보여짐
- 메인 페이지 로드시 `frontend/src/js/app.js` 파일이 호출되며, 강의 리스트 / 검색 / 모달 기능을 초기화시킴
- 강의를 클릭하면 해당 강의 상세페이지로 이동
- 검색창에 단어를 입력하면 keydown 리스너에 의해 자동으로 검색됨 (2자 이상 입력 시)
- '강의 생성'을 클릭하면 강의 생성 모달이 뜨게됨. 유효값 입력시 강의 생성, 강의 리스트 맨 앞에 prepend 됨

### 3. 파일별 설명

<table>
   <tbody>
      <tr>
         <th>파일</th>
         <th>설명</th>
      </tr>
      <tr>
         <td>`frontend/server.js`</td>
         <td>프론트엔드 서버 실행. `yarn dev` 실행시 `localhost:8080`에서 작동 </td>
      </tr>
      <tr>
         <td>`frontend/src/index.html`</td>
         <td>처음에 보여질 메인 페이지. 헤더, 레이아웃, 검색창 강의 리스트, 모달 등의 html 요소가 정의되어 있음.</td>
      </tr>
      <tr>
         <td>`frontend/src/js/app.js`</td>
         <td>강의 가져오기 `getCourses()`, 검색 바 세팅`search()`, 모달 세팅`modal()` 메서드를 실행시켜 페이지 초기화 </td>
      </tr>
      <tr>
         <td>`frontend/src/js/pages/courseList.js`</td>
         <td>메인페이지 (강의 리스트 페이지)에 필요한 함수들이 있음. (검색바 기능, 검색 결과 가져오기, 모달 초기화 기능, 강의 가져오기, 모달 입력 시 폼 체크 기능, 강의 생성 시 리스트 append 기능)</td>
      </tr>
       <tr>
         <td>`frontend/src/js/pages/courseShow.js`</td>
         <td>강의 상세페이지. courseShow.html이 호출되면 해당 페이지에 있는 `showCourse()` 함수를 호출함. `window.location.pathname`에서 강의 id를 받아온 후에, 해당 강의를 api로 가져옴. 가져온 강의 내용을 html DOM에 보여줌</td>
      </tr>
      <tr>
         <td>`frontend/src/js/utils/api.js`</td>
         <td>백엔드 서버(localhost:3000)으로 데이터 요청을 보내는 함수. javascript의 fetch 를 사용하고 async, await 비동기 방식으로 데이터를 받아옴. 크게 네 가지가 있음: 전체 강의 리스트 호출, 개별 강의 호출, 검색 호출, 강의 생성</td>
      </tr>
      <tr>
         <td>`frontend/src/js/utils/course.js`</td>
         <td>메인페이지 강의 가져오기에서 심화 기능들만 따로 정리. 강의 리스트를 Html에 보여주는 `showCourses()`함수와, javascript의 IntersectionObserver 함수를 사용해서 인피니티 스크롤 적용</td>
      </tr>
       <tr>
         <td>`frontend/src/html/courseShow.html`</td>
         <td>강의 상세페이지 기본 html. courseShow.js 파일을 호출해서 동적으로 데이터를 변경함</td>
      </tr>
       <tr>
         <td>`frontend/src/css/styles.css`</td>
         <td>프론트엔드 페이지 스타일 적용하는 css 파일. 모바일 반응형으로 구현 </td>
      </tr>
   </tbody>
</table>

### 4. 기능 설명

### 강의 리스트 호출 (인피니티 스크롤)

- `Intersection Observer`(교차 관찰자 API)를 사용해 infinite scroll 구현
- (\* 타겟 엘레멘트와 상위 엘레멘트의 뷰포트가 교차되는 부분을 비동기적으로 관찰하는 API.)

- 첫 화면 로드시 `getCourses()` 함수를 비동기로 호출하여 화면 최하단까지 스크롤 시 다음 20개의 강의를 가져온다.
- 강의 데이터를 가져오면 `showCourses()` 함수를 호출해 기존 강의 리스트에 새로운 데이터를 append 함

### 강의 검색

- 첫 화면 로드시 `search()` 함수를 실행

- 검색 엘리먼트에 focus, input 이벤트를 추가하여 포커스 하거나, 입력을 했을 때 검색바에 입력한 문자 길이를 체크
- 만약 문자 길이가 2자 이상이면 검색 결과를 가져오는 api `getSearchResult`를 비동기로 호출. 호출 후에는 화면에 검색 리스트를 그려줌
- 검색 결과마다, id값을 참고해 해당 강의 페이지로 갈 수 있는 링크를 연결해줌
- 검색 엘리먼트에 focusout 이벤트를 추가하여 포커스 아웃시 검색 리스트를 숨김.

### 강의 생성

- 첫 화면 로드시 `modal()` 함수를 실행

- '강의 추가' 플로팅 버튼을 누르면 모달이 팝업됨
- 모달 백그라운드 혹은 '강의 추가'를 다시 누르면 기존에 추가된 click 이벤트에 의해 `checkModal`함수를 호출. 모달 클래스를 toggle 시켜 열고 닫을 수 있음.
- 폼을 제출하는 '확인' 버튼을 누르면 `checkForm` 함수를 실행. 각 폼의 값을 확인하여 (제목 여부 확인, 강의 가격이 0 이상) 유효하지 않다면 toast로 알림 띄움 (Toastify 라이브러리 사용).

- 만약 폼 값이 유효하다면 `createCourse` 함수를 호출. 폼에 입력된 제목/가격 값을 `URLSearchParams`에 추가하여 `createCourse` 비동기 api 호출
- `createCourse` api에서는 params로 받은 값을 body 에 넣고, 강의 생성 url로 POST 요청을 보냄
- 성공적으로 생성시, api 결과 값을 받아서 `appendCourse` 호출. 강의 리스트 맨 앞에 생성한 강의를 추가함

### 강의 상세

- 강의 리스트를 불러올 때, a tag에 `/courses/${id}` url 주소 설정

- 강의를 클릭하면 해당 주소 강의 상세페이지로 이동함
- 강의 상세페이지는 상단 배너에 이미지/제목/가격/지식 공유자 등이 있고, 하단에는 skeleton 형태의 레이아웃이 있음.

### 5. 작동 이미지

### PC 버전

<table>
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267348-fe8481b5-f858-47e5-b8a6-9fec33162ea5.png"  alt="inflearn pc main" ></td>
  </tr> 
  <tr>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267352-f79a4f34-4f65-441a-8c72-349875ec9dcd.png" alt="inflearn pc main"></td>
  </tr> 
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267381-08b1b404-8ecd-409f-9417-7c3b3d262d36.png"  alt="inflearn pc search" ></td>
  </tr> 
  <tr>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267404-400ff5bb-009f-4794-9ab7-5f85fadae490.png" alt="inflearn pc show"></td>
  </tr> 
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267415-54c33584-a321-4fab-a3d1-69630f234ec7.png"  alt="inflearn pc search" ></td>
  </tr> 
  <tr>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267449-f1b7bdb0-7380-4c54-80cb-9938870966d5.png" alt="inflearn pc modal"></td>
  </tr> 
    <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267473-7518f35a-b74f-42ca-b80e-6cc0bf4bdfb3.png"  alt="inflearn pc modal fail" ></td>
    </tr> 
   <tr>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267480-8f630a78-35c4-496b-b424-4d8162195603.png" alt="inflearn pc modal success"></td>
  </tr> 
</table>

### 모바일 버전

<table>
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267313-197c96c2-ee19-4157-b2a9-198887a439af.png"  alt="inflearn mobile main" width="300" ></td>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267323-6af67818-8ffd-4456-ad6d-78d1f5e17050.png" alt="inflearn mobile modal"  width="300" ></td>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267338-425def1f-4b25-4da2-bec6-1fe911a9c1a5.png" alt="inflearn mobile show"  width="300" ></td>
  </tr> 
</table>

