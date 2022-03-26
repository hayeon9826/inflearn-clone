import { getCourseList } from "../utils/api.js";

export const showCourses = (data) => {
  console.log("api called!!");
  const { courses } = data;
  const loader = document.querySelector(".loader");
  const last = document.querySelector(".course_end");

  if (courses.length) {
    courses.forEach((course) => {
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
      last.before(li);
    });
  } else {
    loader.style.display = "none";
  }
};

class Observer {
  constructor() {
    this.page = 0;
    this.courseLength = 20;
  }

  observe() {
    const last = document.querySelector(".course_end");

    const observer = new IntersectionObserver((elements) => {
      elements.forEach(async (el) => {
        if (el.isIntersecting) {
          this.page++;

          if (this.courseLength >= 20) {
            console.log("length > 20");
            const courses = await getCourseList(this.page);
            if (courses && courses.ok) {
              showCourses(courses.data);
            }
          }
        }
      });
    });

    if (last) {
      observer.observe(last);
    }
  }
}

export const Observe = new Observer();
