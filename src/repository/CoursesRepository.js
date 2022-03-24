"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchOnCourse = void 0;
const Course_1 = __importDefault(require("../model/Course"));
const courses_1 = require("../data/courses");
function* searchGen(arr, keyword) {
    const reg = typeof keyword === "string" ? new RegExp(keyword) : keyword;
    for (const course of arr) {
        if (reg.test(course.title)) {
            if (yield course) {
                break;
            }
        }
    }
}
function searchOnCourse(arr, keyword, count) {
    const iter = searchGen(arr, keyword);
    let curr = iter.next();
    const result = [];
    let currCount = 1;
    while (!curr.done) {
        result.push(curr.value);
        curr = iter.next(currCount === count);
        currCount++;
    }
    return result;
}
exports.searchOnCourse = searchOnCourse;
function getDelayTime(forTest) {
    if (forTest || Math.random() <= 0.5) {
        return 0;
    }
    // 50%의 확률로 0s ~ 4s
    return Math.floor(Math.random() * 4000); // 0s ~ 4s
}
class CoursesRepository {
    // repository에 대한 다음 구현은 실제로 적절하지 않지만
    // 현재 상태는 repository 자체를 구현해야하므로 이렇게 구현합니다.
    constructor(forTest) {
        this.forTest = forTest;
        this.lastCourseId = CoursesRepository._courses[0].id;
    }
    doIReject() {
        return this.forTest ? false : Math.random() <= 0.1; // 10% 확률
    }
    list({ page = 1, count = 20, lastContentId, search: _search, }) {
        const search = _search !== undefined ? _search.trim() : '';
        const courses = search.length > 0 ? searchOnCourse(CoursesRepository._courses, search, page * count) : CoursesRepository._courses;
        const indexOfLastContent = lastContentId !== undefined && lastContentId > -1
            ? courses.findIndex(({ id }) => id === lastContentId) + 1
            : (page - 1) * count;
        const result = courses.slice(indexOfLastContent, indexOfLastContent + count);
        return new Promise((resolve, reject) => {
            if (this.doIReject()) {
                reject({ code: -1, message: '랜덤하게 발생하는 강제 에러 입니다.' });
                return;
            }
            setTimeout(() => {
                resolve(result);
            }, getDelayTime(this.forTest));
        });
    }
    getById(id) {
        return new Promise((resolve) => {
            const course = CoursesRepository._courses.find(({ id: courseId }) => courseId === id) || null;
            resolve(course);
        });
    }
    create({ title, price }) {
        return new Promise((resolve, reject) => {
            if (this.doIReject()) {
                reject({ code: -2, message: '랜덤하게 발생하는 강제 에러 입니다.' });
                return;
            }
            this.lastCourseId = this.lastCourseId + 1;
            CoursesRepository._courses =
                [new Course_1.default(this.lastCourseId, title, courses_1.MyInstructorName, price, courses_1.getTemporaryImageURL())]
                    .concat(CoursesRepository._courses);
            setTimeout(() => {
                resolve(this.lastCourseId);
            }, getDelayTime(this.forTest));
        });
    }
}
exports.default = CoursesRepository;
CoursesRepository._courses = courses_1.courses;
