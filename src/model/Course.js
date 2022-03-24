"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Course {
    constructor(id, title, instructorName, price, coverImageUrl) {
        this.id = id;
        this.title = title;
        this.instructorName = instructorName;
        this.price = price;
        this.coverImageUrl = coverImageUrl;
    }
}
exports.default = Course;
