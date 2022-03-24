"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("../../src/model/Course"));
const CoursesRepository_1 = __importStar(require("../../src/repository/CoursesRepository"));
describe("CoursesRepository", () => {
    let repo;
    beforeEach(() => {
        repo = new CoursesRepository_1.default(true);
    });
    describe("list", () => {
        it("아무 옵션 없이 호출하면 기본 값으로 가져옵니다. (page: 1, count: 20)", () => __awaiter(void 0, void 0, void 0, function* () {
            const defaultCount = 20;
            const courses = yield repo.list({});
            expect(courses.length).toBeLessThan(defaultCount + 1);
        }));
        it("page과 count를 전달하면 적절하게 동작합니다.", () => __awaiter(void 0, void 0, void 0, function* () {
            const defaultCount = 20;
            const coursesPage1 = yield repo.list({ page: 1 });
            const coursesPage2 = yield repo.list({ page: 2 });
            expect(coursesPage1.length).toBeLessThan(defaultCount + 1);
            expect(coursesPage2[0].id).toBeLessThan(coursesPage1[coursesPage1.length - 1].id);
            expect(coursesPage2.length).toBeLessThan(coursesPage1.length === defaultCount ? defaultCount + 1 : 1);
        }));
        it("lastContentId를 전달하면 lastContentId를 id로 갖는 강의의 다음 강의부터 페이징처리 합니다.", () => __awaiter(void 0, void 0, void 0, function* () {
            const lastContentId = 372;
            const courses = yield repo.list({ lastContentId });
            expect(courses[0].id).toBeLessThan(lastContentId);
        }));
        it("search를 전달하면 해당 값이 제목에 포함된 강의를 가져옵니다.", () => __awaiter(void 0, void 0, void 0, function* () {
            const search = '강좌';
            const courses = yield repo.list({ search });
            const filteredCourses = courses.filter(({ title }) => title.indexOf(search) > -1);
            expect(courses.length).toBe(filteredCourses.length);
        }));
        it("search를 적용한 상태에서 page의 동작을 확인합니다.", () => __awaiter(void 0, void 0, void 0, function* () {
            const search = '강좌';
            const courses1 = yield repo.list({ page: 1, search });
            const courses2 = yield repo.list({ page: 2, search });
            expect(courses1.map(({ id }) => id)).not.toEqual(courses2.map(({ id }) => id));
        }));
    });
    it("강의 ID를 사용해 강의를 가져옵니다.", () => __awaiter(void 0, void 0, void 0, function* () {
        const course3 = yield repo.getById(3);
        const courseNull = yield repo.getById(-1);
        expect(course3 === null || course3 === void 0 ? void 0 : course3.id).toBe(3);
        expect(courseNull).toBeNull();
    }));
    it("search util 함수가 정상동작 합니다.", () => {
        const arr = [
            "foo",
            "fooo",
            "bar1",
            "foo2oo",
            "bar123",
            "6bar",
            "7fo",
            "8fooo1",
            "f",
            "10baz",
            "10bar",
            "10bar",
            "10bar",
            "10bar",
        ].map((title) => new Course_1.default(1, title, "a", 1, "b"));
        const result1 = CoursesRepository_1.searchOnCourse(arr, 'foo', 3);
        const result2 = CoursesRepository_1.searchOnCourse(arr, 'bar', 3);
        const result3 = CoursesRepository_1.searchOnCourse(arr, 'bar', 100);
        expect(result1.length).toBeLessThan(3 + 1);
        expect(result2.length).toBeLessThan(3 + 1);
        expect(result3.length).toBe(7);
    });
    it('create를 통해 강의를 추가합니다.', () => __awaiter(void 0, void 0, void 0, function* () {
        const createdCourseId = yield repo.create({ title: 'foo', price: 1000 });
        const createdCourse = yield repo.getById(createdCourseId);
        expect(createdCourse).not.toBeNull();
    }));
});
