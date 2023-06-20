"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../utils/db"));
const countries_types_1 = require("../types/countries.types");
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
const countriesController = {
    getCountries: (req, res, next) => {
        // console.log(req.query);
        if (!Object.keys(req.query).length) {
            db_1.default.execute('SELECT * FROM world.city')
                .then((data) => {
                const responseData = parseDBRecordToResponse(data[0]);
                res.status(200).json(responseData);
            })
                .catch((err) => {
            });
        }
        else {
            const searchParamsKeys = Object.keys(req.query).map((key) => `city.${countries_types_1.ResponseToDBParamsMap[key]} = ?`).join(' AND ');
            const searchParamsValues = Object.keys(req.query).map((key) => req.query[key]);
            db_1.default.execute(`SELECT * FROM world.city WHERE ${searchParamsKeys}`, searchParamsValues)
                .then((data) => {
                const responseData = parseDBRecordToResponse(data[0]);
                res.status(200).json(responseData);
            })
                .catch((err) => {
            });
        }
    }
};
exports.default = countriesController;
