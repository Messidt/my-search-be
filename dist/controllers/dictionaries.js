"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const dictionaries_types_1 = require("../types/dictionaries.types");
function parseDBDictionaryRecordToResponse(dbData, type) {
    return dbData.map((elm) => elm[type]);
}
const dictionariesController = {
    getCountries: (req, res, next) => {
        db_1.default.execute(`SELECT ${dictionaries_types_1.DictionaryType[req.query.type]} FROM world.country`)
            .then((data) => {
            const responseData = parseDBDictionaryRecordToResponse(data[0], dictionaries_types_1.DictionaryType[req.query.type]);
            res.status(200).json(responseData);
        })
            .catch((err) => {
        });
    }
};
exports.default = dictionariesController;
