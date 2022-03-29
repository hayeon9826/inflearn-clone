import { getCourse } from "../utils/api.js";
import { showCourses } from "../utils/course.js";

// 현재 url에서 마지막 요소 (id) 추출
const getId = () => {
  const courseId = window.location.pathname.split("/")[2];
  return parseInt(courseId);
};

// 현재 강의 데이터를 가져오고, 화면에 노출
const showCourse = async () => {
  const id = getId();
  const course = await getCourse(id);
  if (course && course.ok) {
    displayCourse(course);
  }
};

// 화면에 현재 강의 표시
const displayCourse = (response) => {
  const { course } = response.data;

  const img = document.querySelector(".course_show_img");
  const title = document.querySelector(".course_show_title");
  const author = document.querySelector(".course_show_author");
  const price = document.querySelector(".course_show_price");

  img.src = course.coverImageUrl;
  title.innerHTML = course.title;
  author.innerHTML = course.instructorName;
  price.innerHTML = "₩" + parseInt(course.price).toLocaleString();
};

const init = () => {
  showCourse();
};

init();
