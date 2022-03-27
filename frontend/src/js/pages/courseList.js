import {
  getCourseList,
  getSearch,
  createCourse,
  getCourse,
} from "../utils/api.js";
import { showCourses } from "../utils/course.js";

export const search = () => {
  const searchInput = document.querySelector(".search_input");
  const searchResult = document.querySelector(".search_result");
  searchInput.addEventListener("keydown", handleInput);
  searchInput.addEventListener("focus", handleInput);
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
  } else {
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
  const modalSubmit = document.querySelector(".modal_submit");
  modalBtn.addEventListener("click", checkModal);
  modalSubmit.addEventListener("click", checkForm);
  modalBackground.addEventListener("click", checkModal);
};

const checkModal = () => {
  const modal = document.querySelector(".modal");
  modal.classList.toggle("hidden");
};

const checkForm = async (e) => {
  const titleInput = document.querySelector("#title_input");
  const priceInput = document.querySelector("#price_input");
  const modal = document.querySelector(".modal");
  e.preventDefault();
  if (!titleInput.value.length) {
    Toastify({
      text: "제목을 입력해주세요.",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #FF6347, #FF6347)",
      },
    }).showToast();
  } else if (!priceInput.value) {
    Toastify({
      text: "가격을 입력헤주세요.",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #FF6347, #FF6347)",
      },
    }).showToast();
  } else if (priceInput.value < 0) {
    Toastify({
      text: "가격은 0보다 커야합니다.",
      duration: 3000,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #FF6347, #FF6347)",
      },
    }).showToast();
  } else {
    const data = new URLSearchParams();
    data.append("title", titleInput.value);
    data.append("price", priceInput.value);
    const response = await createCourse(data);

    if (response && response.ok) {
      const course = await getCourse(response?.data?.createdCourseId);
      if (course && course.ok) {
        appendCourse(course);
      }
      modal.classList.toggle("hidden");
      titleInput.value = "";
      priceInput.value = "";
      Toastify({
        text: "강의를 생성했습니다.",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00c471, #00c471)",
        },
      }).showToast();
    } else {
      Toastify({
        text: "생성 중 문제가 발생했습니다. 다시 시도해주세요.",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #FF6347, #FF6347)",
        },
      }).showToast();
    }
  }
};

const appendCourse = (response) => {
  const { course } = response.data;
  const list = document.querySelector(".course_list");

  const li = document.createElement("li");
  const link = document.createElement("a");
  const imgDiv = document.createElement("div");
  const img = document.createElement("img");
  const title = document.createElement("div");
  const author = document.createElement("div");
  const price = document.createElement("div");

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

  li.appendChild(link);
  link.appendChild(imgDiv);
  imgDiv.appendChild(img);
  link.append(title);
  link.append(author);
  link.append(price);
  list.prepend(li);
};
