import { getCourses, search, modal } from "./pages/courseList.js";
import { Observe } from "./utils/course.js";

const init = () => {
  // infinite scroll 세팅
  getCourses().then(() => Observe.observe());
  // 검색바 세팅
  search();
  // 모달 세팅
  modal();
};

init();
