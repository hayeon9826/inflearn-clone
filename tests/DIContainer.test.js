"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DIContainer_1 = __importDefault(require("../DIContainer"));
describe('DIContainer', () => {
    let container;
    beforeEach(() => {
        container = new DIContainer_1.default();
    });
    describe('register', () => {
        it('잘못된 인자를 전달하면 에러를 발생시킵니다.', () => {
            expect(() => container.register('', ['B'], () => '')).toThrow();
            expect(() => container.register('A', [''], () => '')).toThrow();
        });
    });
    describe('get', () => {
        it('name을 전달하지 않거나 등록되지 않은 이름을 전달하면 undefined를 반환합니다.', () => {
            expect(container.get('')).toBeUndefined();
            expect(container.get('anonymouns')).toBeUndefined();
        });
        it('의존성이 없는 의존성을 등록하고 가져올 수 있습니다.', () => {
            const name = 'Foo';
            const dependencies = [];
            const returnDependency = 'FooDependency';
            container.register(name, dependencies, () => returnDependency);
            expect(container.get(name)).toBe(returnDependency);
        });
        it('의존성이 있는 의존성을 등록하고 가져올 수 있습니다.', () => {
            const dependenciesToRegister = [
                ['Dep1', [], () => 1],
                ['Dep2', [], () => 2],
            ];
            dependenciesToRegister.forEach((args) => container.register(...args));
            const name = 'Dep3';
            const dependencies = ['Dep1', 'Dep2'];
            const factoryFunction = (dep1, dep2) => dep1 + dep2;
            container.register(name, dependencies, factoryFunction);
            expect(container.get('Dep3')).toBe(3);
        });
        it('중첩 의존성이 있는 의존성을 등록하고 가져올 수 있습니다.', () => {
            const dependenciesToRegister = [
                ['Dep1', [], () => 1],
                ['Dep2', [], () => 2],
                ['Dep3', ['Dep1', 'Dep2'], (dep1, dep2) => dep1 + dep2],
            ];
            dependenciesToRegister.forEach((args) => container.register(...args));
            const name = 'Dep4';
            const dependencies = ['Dep3'];
            const factoryFunction = (dep3) => dep3 + 10;
            container.register(name, dependencies, factoryFunction);
            expect(container.get('Dep4')).toBe(13);
        });
    });
});
