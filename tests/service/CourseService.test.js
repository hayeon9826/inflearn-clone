"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CourseService_1 = __importDefault(require("../../src/service/CourseService"));
describe('CourseService', () => {
    let rejectionService;
    class CourseRepositoryMock {
        list(options = {}) {
            options;
            return Promise.reject('is rejected');
        }
        getById(id) {
            id;
            return Promise.reject('is rejected');
        }
        create(options = { title: '', price: 0 }) {
            options;
            return Promise.reject('is rejected');
        }
    }
    beforeEach(() => {
        rejectionService = new CourseService_1.default(new CourseRepositoryMock());
    });
    it('CourseSerive의 getCourseList는 CoursesRepository에서 reject를 반환하면 똑같이 reject를 반환합니다.', () => {
        return expect(rejectionService.getCourseList({})).rejects.toBe('is rejected');
    });
    it('CourseSerive의 searchCourses는 CoursesRepository에서 reject를 반환하면 똑같이 reject를 반환합니다.', () => {
        return expect(rejectionService.searchCourses({})).rejects.toBe('is rejected');
    });
    it('CourseSerive의 createCourse는 CoursesRepository에서 reject를 반환하면 똑같이 reject를 반환합니다.', () => {
        return expect(rejectionService.createCourse({ title: 'foo', price: 100 })).rejects.toBe('is rejected');
    });
});
