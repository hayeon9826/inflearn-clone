import { getCourseList, getSearch } from "../utils/api.js";
import { showCourses } from "../utils/course.js";

export const search = () => {
  const searchInput = document.querySelector(".search_input");
  const searchResult = document.querySelector(".search_result");
  searchInput.addEventListener("keydown", handleInput);
  searchInput.addEventListener("focusout", (e) => {
    // console.log(e.relatedTarget?.className);
    if (!e?.relatedTarget) {
      searchResult.style.display = "none";
      searchInput.classList.remove("search_active");
    }
  });
};

const handleInput = (e) => {
  const searchInput = document.querySelector(".search_input");
  const searchResult = document.querySelector(".search_result");

  if (searchInput.value && searchInput.value.length > 1) {
    searchResult.style.display = "block";
    searchInput.classList.add("search_active");
    getSearchResult(searchInput.value);
    console.log(searchInput.value);
  } else {
    console.log("too short");
    searchResult.style.display = "none";
    searchInput.classList.remove("search_active");
  }
};

const getSearchResult = async (value) => {
  const searchList = document.querySelector(".search_result_list");
  const searchInput = document.querySelector(".search_input");
  const searchResult = document.querySelector(".search_result");

  const response = await getSearch(value);
  searchList.innerHTML = "";
  if (response.data && response.ok && response.data.results.length > 0) {
    searchResult.style.display = "block";
    searchInput.classList.add("search_active");
    response.data.results.forEach((result) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      li.className = "search_item";
      link.className = "search_link";
      link.innerHTML = result.title;
      link.href = `/courses/${result.id}`;

      li.append(link);
      searchList.append(li);
    });
  } else {
    searchResult.style.display = "none";
    searchInput.classList.remove("search_active");
  }
};

export const getCourses = async (page) => {
  const courses = await getCourseList(page);
  if (courses && courses.ok) {
    showCourses(courses.data);
  }
};

export const modal = () => {
  const modal = document.querySelector(".modal");
  const modalBtn = document.querySelector(".float");
  const modalBackground = modal.querySelector(".modal__background");
  modalBtn.addEventListener("click", checkModal);
  modalBackground.addEventListener("click", checkModal);
};

const checkModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hidden");
};
