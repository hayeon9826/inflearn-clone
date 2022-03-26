import { getCourses, search, modal } from "./pages/courseList.js";
import { Observe } from "./utils/course.js";

const init = () => {
  // infinite scroll
  getCourses().then(() => Observe.observe());
  search();
  modal();
};

init();
