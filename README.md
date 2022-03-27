# 인프런 코딩 테스트

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

```
- 설명이 들어갑니다.
```

### 강의 검색

```
- 설명이 들어갑니다.
```

### 강의 생성

```
- 설명이 들어갑니다.
```

### 강의 상세

```
- 설명이 들어갑니다.
```

### 5. 작동 이미지

### PC 버전

<table>
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267348-fe8481b5-f858-47e5-b8a6-9fec33162ea5.png"  alt="inflearn pc main" ></td>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267352-f79a4f34-4f65-441a-8c72-349875ec9dcd.png" alt="inflearn pc main"></td>
  </tr> 
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267381-08b1b404-8ecd-409f-9417-7c3b3d262d36.png"  alt="inflearn pc search" ></td>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267404-400ff5bb-009f-4794-9ab7-5f85fadae490.png" alt="inflearn pc show"></td>
  </tr> 
  <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267415-54c33584-a321-4fab-a3d1-69630f234ec7.png"  alt="inflearn pc search" ></td>
    <td><img src="https://user-images.githubusercontent.com/38210233/160267449-f1b7bdb0-7380-4c54-80cb-9938870966d5.png" alt="inflearn pc modal"></td>
  </tr> 
    <tr>
    <td> <img src="https://user-images.githubusercontent.com/38210233/160267473-7518f35a-b74f-42ca-b80e-6cc0bf4bdfb3.png"  alt="inflearn pc modal fail" ></td>
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

---

## 환경 구성

1. `yarn` 실행
2. `yarn start` 실행 (API 서버 실행)
   - port : 3000

## 서비스 내용

강의를 검색하고 검색 결과를 리스트로 볼 수 있는 페이지를 만듭니다.
아래 강의 리스트와 강의 검색에 관한 기능 요청을 참고해서 서비스를 만듭니다.

## 메인 페이지의 구현은 다음을 참고합니다.

1. 강의 리스트 페이지가 메인 페이지 입니다.
2. 처음 페이지에 들어가면 전체 강의 리스트를 보여줍니다.

## 강의 리스트 페이지의 구현은 다음을 참고합니다.

1. 아래 API 명세를 참고하여 서버에서 응답으로 받은 강의 리스트를 노출합니다.
2. 무한 스크롤을 이용하여 강의 리스트를 노출합니다.
3. 각 강의는 다음 내용을 포함합니다.
   - 강의 이미지
   - 강의 제목
   - 지식공유자 이름
   - 강의 가격
4. 각 강의는 클릭하면 강의 상세 페이지로 이동할 수 있어야 합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.
   - 단, 페이지 이동은 가능해야 합니다.

## 강의 검색의 구현은 다음을 참고합니다.

1. 검색창에 검색어 입력시 입력창 하단에 검색 결과 리스트를 표시합니다. 사용 API는 명세를 참고합니다.
   - 검색 결과는 강의 제목을 나열합니다.
2. 검색어가 2자 이상이면 검색 결과를 노출합니다.
3. 검색창을 포커싱할 때 이미 입력되어있는 검색어가 있다면 검색 결과를 노출합니다.
4. 검색창이 포커싱 아웃(blur)되면 검색결과 리스트를 숨깁니다.
5. 검색 결과에 나타난 강의 제목을 클릭하면 해당 강의 상세 페이지로 이동합니다.
   - 상세 페이지는 구체적으로 구현하지 않습니다.

## 강의 추가 구현은 다음을 참고합니다.

1. 강의 리스트 페이지에 강의 추가 버튼을 만듭니다.
2. 강의 추가 버튼을 클릭하면 강의를 추가하기 위한 모달이 나타납니다.
3. 모달에선 강의의 제목과 가격을 입력 받습니다.
   - 빈 강의 제목, 가격에 음수가 입력된다면 사용자에게 안내하고 강의를 생성할 수 없습니다.
   - 강의에 필요한 다른 값들은 서버에서 임의로 설정합니다.
4. 강의 추가를 위한 API를 참고하여 강의를 추가합니다.
5. 추가가 완료되면 모달을 닫고 강의 리스트에 추가된 강의를 반영합니다.

## 각 구현은 다음을 참고합니다.

1. HTML 페이지를 제공하는 서버는 `server.js`의 NodeJS 서버를 활용해도 되고 별도의 서버를 만들어 사용해도 됩니다.
2. 페이지는 반응형으로 동작 하고 모바일 버전도 고려되어야 합니다.
3. React, Vue, Angular, Svelte와 같은 프론트엔드 라이브러리 또는 프레임워크를 사용하지 않고 Vanilla javascript를 통해 개발해야합니다.
   - 기타 다른 패키지의 사용에는 제한이 없습니다.
4. API는 아래 [API 명세](#API-명세)를 참고합니다.
5. local에서 git commit을 작성합니다. (remote repository에는 업로드 하지 않습니다.)
6. 제출하시는 프로젝트(폴더)를 통해서만 과제를 검토합니다. 따라서 제출하신 프로젝트를 통해서 서비스를 실행할 수 있어야 합니다.
7. `node_modules`는 제거하고 제출하셔야 합니다.
8. test를 작성한다면 별도의 폴더를 만들지 않고 `tests` 폴더에 작성합니다.
9. 아래 [**구현 설명**](#구현-설명) 영역에는 과제에 대해 설명 또는 전달하고 싶은 내용을 자유롭게 적어주시면 됩니다.
10. 위 참고 내용 외에 다른 내용을 구현하는 것은 자유롭게 진행합니다.

- 위에 요구된 내용은 필수 항목입니다. 즉, 필수 요구사항을 충족한다면 구현 방식은 자유입니다.
- 버그가 아닌 구현 방식에 대한 문의는 자유구현이기 때문에 하지 않으셔도 됩니다.

## API 명세

<table>
<tbody>
<tr>
<th>Method</th>
<th>URL</th>
<th>Query String</th>
<th>Body</th>
<th>Response</th>
<th>비고</th>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses`

</td>
<td>

`page`: (_기본값: 1, 값: 1 이상의 number_) 페이지<br/>
`count`: (_기본값: 20, 값: 1 이상의 number_) 페이지당 컨텐츠 수<br/>
`lastContentId`: (_값: 1 이상의 number_) 요청하는 페이지의 이전 페이지 마지막 컨텐츠 id<br/>
`search`: (_값: string_) 검색어

</td>
<td></td>
<td>

success

```json
{
   "ok": true,
   "data": {
      "courses": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
            "price": (number) 강의 가격,
            "coverImageUrl": (string) 강의 커버 이미지
         },
         ...
      ]
   }
}
```

fail

```json
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의리스트<br>무작위로 에러가 발생할 수 있습니다.</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/courses/:courseId`

</td>
<td></td>
<td></td>
<td>

success

```json
{
   "ok": true,
   "data": {
      "course": {
         "id": (number) 강의 ID,
         "title": (string) 강의 제목,
         "instructorName": (string) 지식공유자 이름,
         "price": (number) 강의 가격,
         "coverImageUrl": (string) 강의 커버 이미지
      }
   }
}
```

fail

```json
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의상세</td>
</tr>
<tr>
<td>POST</td>
<td>

`/api/courses`

</td>
<td></td>
<td>

```json
{
   "title": (string) 강의 제목,
   "price": (0 이상의 number) 강의 가격
}
```

</td>
<td>

success

```json
{
   "ok": true,
   "data": {
      "createdCourseId": (number) 추가된 강의 ID
   }
}
```

fail

```json
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>강의 추가<br>무작위로 에러가 발생할 수 있습니다.</td>
</tr>
<tr>
<td>GET</td>
<td>

`/api/search/courses`

</td>
<td>

`keyword`: (_값: string_) 검색어<br/>
`max`: (_기본값: 10, 값: 1 이상의 number_) 검색결과 최대 갯수<br/>

</td>
<td></td>
<td>

success

```json
{
   "ok": true,
   "data": {
      "results": [
         {
            "id": (number) 강의 ID,
            "title": (string) 강의 제목,
            "instructorName": (string) 지식공유자 이름,
         },
         ...
      ]
   }
}
```

fail

```json
{
   "ok": false,
   "error": {
      "message": (string) 에러 메세지
   }
}
```

</td>
<td>검색<br>무작위로 에러가 발생할 수 있습니다.</td>
</tr>
</tbody>
</table>
