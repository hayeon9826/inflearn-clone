"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class CourseService {
    constructor(coursesRepository) {
        this.repo = coursesRepository;
    }
    /** 강의 리스트 조회 */
    getCourseList({ page, count, lastContentId, search, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = page || 1;
            const c = count || 20;
            if (p <= 0 ||
                c <= 0 ||
                (typeof lastContentId === "number" && lastContentId <= 0)) {
                return Promise.reject(new Error("page, count 또는 lastContentId는 음수일 수 없습니다."));
            }
            const courses = yield this.repo.list({
                page: p,
                count: c,
                lastContentId,
                search,
            });
            return Promise.resolve(courses);
        });
    }
    /** 강의 상세 */
    getCourse(courseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const course = yield this.repo.getById(courseId);
            return Promise.resolve(course);
        });
    }
    /** 강의 검색 */
    searchCourses({ keyword, max, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (max !== undefined && max <= 0) {
                return Promise.reject(new Error("max는 음수일 수 없습니다."));
            }
            const m = max || 10;
            const courses = (yield this.repo.list({ page: 1, count: m, search: keyword })).map(({ id, title, instructorName }) => ({
                id,
                title,
                instructorName,
            }));
            return Promise.resolve(courses);
        });
    }
    /** 강의 추가 */
    createCourse({ title, price }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!title.trim()) {
                return Promise.reject(new Error("강의 제목은 빈 문자열일 수 없습니다."));
            }
            if (price < 0) {
                return Promise.reject(new Error("강의 가격은 음수일 수 없습니다."));
            }
            const createdCourseId = yield this.repo.create({ title, price });
            return Promise.resolve(createdCourseId);
        });
    }
}
exports.default = CourseService;
