import { getCourseList } from "../utils/api.js";
import { showCourses } from "../utils/course.js";

export const search = () => {
  const searchInput = document.querySelector(".search_input");
};

export const getCourses = async (page) => {
  const courses = await getCourseList(page);
  if (courses && courses.ok) {
    showCourses(courses.data);
  }
};
