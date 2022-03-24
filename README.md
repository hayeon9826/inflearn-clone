# 인프런 코딩 테스트

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

`page`: (*기본값: 1, 값: 1 이상의 number*) 페이지<br/>
`count`: (*기본값: 20, 값: 1 이상의 number*) 페이지당 컨텐츠 수<br/>
`lastContentId`: (*값: 1 이상의 number*) 요청하는 페이지의 이전 페이지 마지막 컨텐츠 id<br/>
`search`: (*값: string*) 검색어
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

`keyword`: (*값: string*) 검색어<br/>
`max`: (*기본값: 10, 값: 1 이상의 number*) 검색결과 최대 갯수<br/>
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


## 구현 설명
