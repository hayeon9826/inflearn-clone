"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSingleQueryString = void 0;
const isSingleQueryString = (qs) => {
    return typeof qs === "string" || qs === undefined;
};
exports.isSingleQueryString = isSingleQueryString;
