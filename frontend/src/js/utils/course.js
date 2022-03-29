import { getCourseList } from "../utils/api.js";

// 강의 리스트 데이터를 받아서 화면에 그려줌
export const showCourses = (data) => {
  const { courses } = data;
  const loader = document.querySelector(".loader");
  const last = document.querySelector(".course_end");

  if (courses.length) {
    courses.forEach((course) => {
      // html 엘리먼트 생성
      const li = document.createElement("li");
      const link = document.createElement("a");
      const imgDiv = document.createElement("div");
      const img = document.createElement("img");
      const title = document.createElement("div");
      const author = document.createElement("div");
      const price = document.createElement("div");
      // 엘리먼트 속성 추가
      link.href = `/courses/${course.id}`;
      li.className = "course_child";
      link.className = "course_link";
      imgDiv.className = "course_imgDiv";
      img.className = "course_image";
      title.className = "course_title";
      author.className = "course_author";
      price.className = "course_price";

      img.src = course.coverImageUrl;
      title.innerHTML = course.title;
      author.innerHTML = course.instructorName;
      price.innerHTML = "₩" + parseInt(course.price).toLocaleString();

      // 엘리먼트를 리스트에 append
      li.appendChild(link);
      link.appendChild(imgDiv);
      imgDiv.appendChild(img);
      link.append(title);
      link.append(author);
      link.append(price);
      last.before(li);
    });
  } else {
    // 만약 데이터를 모두 불러왔다면 loader 보이지 않기
    loader.style.display = "none";
  }
};

// inifite scroll 구현
class Observer {
  constructor() {
    // page는 0부터 시작해서 하나씩 +
    this.page = 0;
    // 강의는 최대 20개씩만 가져옴
    this.courseLength = 20;
  }

  observe() {
    const last = document.querySelector(".course_end");

    // Intersection observer는 기본적으로 브라우저 뷰포트(Viewport)와 설정한 요소(Element)의 교차점을 관찰하며,
    // 요소가 뷰포트에 포함되는지 포함되지 않는지, 더 쉽게는 사용자 화면에 지금 보이는 요소인지 아닌지를 구별하는 기능을 제공.
    const observer = new IntersectionObserver((elements) => {
      elements.forEach(async (el) => {
        // 현재 리스트와 다음 뷰포트가 교차되는 부분이 나오면
        if (el.isIntersecting) {
          // 다음 페이지 호출
          this.page++;

          if (this.courseLength >= 20) {
            // 다음 강의 가져옴
            const courses = await getCourseList(this.page);
            if (courses && courses.ok) {
              // 가져온 강의 보여줌
              showCourses(courses.data);
            }
          }
        }
      });
    });
    //관찰할 대상(강의 리스트 끝부분) 등록
    if (last) {
      observer.observe(last);
    }
  }
}

export const Observe = new Observer();
