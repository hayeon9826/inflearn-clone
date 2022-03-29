// 전체 강의 리스트 호출
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

// 상세 강의 호출
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

// 검색 결과 호출
export const getSearch = async (value) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/search/courses?keyword=${value}&max=20`
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

// 강의 생성 api 호출
export const createCourse = async (data) => {
  try {
    const response = await fetch(`http://localhost:3000/api/courses`, {
      method: "post",
      body: data,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw new Error("API 호출 실패");
  } catch (e) {
    console.log(e.message);
  }
};
