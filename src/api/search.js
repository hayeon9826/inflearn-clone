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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const queryString_1 = require("../util/queryString");
const router = express_1.default.Router();
exports.router = router;
router.get("/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { query: { keyword: qKeyword, max: qMax }, } = req;
    const max = queryString_1.isSingleQueryString(qMax) ? parseInt(qMax || "10") : 10;
    const keyword = queryString_1.isSingleQueryString(qKeyword) ? qKeyword : undefined;
    let searchResult;
    try {
        searchResult = yield ((_a = Container.get("CourseService")) === null || _a === void 0 ? void 0 : _a.searchCourses({ max, keyword }));
    }
    catch (error) {
        console.error("/search/course error 발생!", error);
    }
    if (searchResult) {
        res.json({
            ok: true,
            data: {
                results: searchResult,
            },
        });
    }
    else {
        const doIShoot500 = Math.random() <= 0.5;
        if (doIShoot500) {
            res.sendStatus(500);
            return;
        }
        res.json({
            ok: false,
            error: {
                message: "검색에 실패했습니다.",
            },
        });
    }
}));
