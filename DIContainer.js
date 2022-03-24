"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** 의존성 주입 컨테이너 */
class DIContainer {
    constructor() {
        this.container = {};
    }
    /**
     * 의존성 등록
     * @param {string} name 의존성 이름
     * @param {string[]} dependencies name 의존성의 의존성
     * @param {(dependencies) => dependencyToGet} factoryFunction 의존성 생성 함수
     */
    register(name, dependencies, factoryFunction) {
        if (!name || dependencies.filter((dependency) => !dependency).length > 0) {
            throw new Error("register 메서드의 인자가 잘못되었습니다.");
        }
        this.container[name] = { dependencies, factoryFunction };
    }
    /**
     * 의존성 획득
     * @param {string} name 등록된 의존성 이름
     * @returns
     */
    get(name) {
        if (!name || !this.container[name]) {
            return;
        }
        const dependencyItem = this.container[name];
        const dependencies = dependencyItem.dependencies.map((dependencyName) => this.get(dependencyName));
        return dependencyItem.factoryFunction(...dependencies);
    }
}
exports.default = DIContainer;
// 사용예
// class A {}
// class B {
//   constructor(instanceOfA) {
//     this.a = instanceOfA;
//   }
// }
// class C {
//   constructor(instanceOfA, someValue) {
//     this.a = instanceOfA;
//     this.someValue = someValue;
//   }
// }
// const container = new DIContainer();
// container.register('A', [], () => new A());
// container.register('B', ['A'], (instanceOfA) => new B(instanceOfA));
// container.register('C', ['A'], (instanceOfA) => (someValue) => new C(instanceOfA, someValue));
// container.get('A');
// container.get('B');
// container.get('C')(10);
