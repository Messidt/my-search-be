"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const dictionaries_types_1 = require("../types/dictionaries.types");
function parseDBRecordToResponse(dbData) {
    return dbData
        .map((elm) => {
        return {
            id: elm.ID,
            name: elm.Name,
            district: elm.District,
            countryCode: elm.CountryCode,
            population: elm.Population
        };
    });
}
const dictionariesController = {
    getCountries: (req, res, next) => {
        console.log(req.query);
        db_1.default.execute(`SELECT ${dictionaries_types_1.DictionaryType[req.query.type]} FROM world.country`)
            .then((data) => {
            const responseData = parseDBRecordToResponse(data[0]);
            res.status(200).json(responseData);
        })
            .catch((err) => {
        });
    }
};
exports.default = dictionariesController;
