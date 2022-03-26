import { getCourse } from "../utils/api.js";
import { showCourses } from "../utils/course.js";

const getId = () => {
  const courseId = window.location.pathname.split("/")[2];
  console.log(courseId);
  return parseInt(courseId);
};

const showCourse = async () => {
  const id = getId();
  console.log(id);
  const course = await getCourse(id);
  if (course && course.ok) {
    displayCourse(course);
  }
};

const displayCourse = (response) => {
  console.log(response);
  const { course } = response.data;
  console.log(course);

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
