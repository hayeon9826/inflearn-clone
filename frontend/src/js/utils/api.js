export const getCourseList = async (page = 1) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/courses?page=${page}`
    );
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("API 호출 실패");
  } catch (e) {
    console.log(e.message);
  }
};

export const getCourse = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/courses/${id}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("API 호출 실패");
  } catch (e) {
    console.log(e.message);
  }
};
