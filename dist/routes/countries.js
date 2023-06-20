"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countries_1 = __importDefault(require("../controllers/countries"));
const router = express_1.Router();
router.get('/', countries_1.default.getCountries);
exports.default = router;
