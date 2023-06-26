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
            id: elm.id,
            cityName: elm.cityName,
            countryName: elm.countryName,
            district: elm.district,
            continent: elm.continent,
            countryCode: elm.countryCode,
            population: elm.population
        };
    });
}
function checkQueryForParams(queries) {
    const paginationKeys = ['pageIndex', 'pageSize'];
    const pagination = { pageIndex: 0, pageSize: 0 };
    const searchFields = {};
    Object.keys(queries)
        .forEach((key) => {
        if (paginationKeys.includes(key)) {
            pagination[key] = queries[key];
        }
        else {
            searchFields[key] = queries[key];
        }
    });
    return { pagination, searchFields };
}
const countriesController = {
    getCountries: (req, res, next) => {
        if (!Object.keys(checkQueryForParams(req.query).searchFields).length) {
            const pagination = checkQueryForParams(req.query).pagination;
            db_1.default.execute(`SELECT cities.name as cityName, countries.name as countryName, countries.code as countryCode, countries.continent as continent, cities.population as population
            FROM world.city as cities
            LEFT JOIN world.country as countries ON cities.CountryCode = countries.Code`)
                .then((data) => {
                const responseData = { totalElements: data[0].length, content: parseDBRecordToResponse(data[0]) };
                res.status(200).json(responseData);
            })
                .catch((err) => {
            });
        }
        else {
            const searchParamsKeys = Object.keys(req.query).map((key) => `${countries_types_1.ColumnKeyToTable[key]}.${countries_types_1.ResponseToDBParamsMap[key]} = ?`).join(' AND ');
            const searchParamsValues = Object.keys(req.query).map((key) => req.query[key]);
            db_1.default.execute(`SELECT cities.name as cityName, countries.name as countryName, countries.code as countryCode, countries.continent as continent, cities.population as population
            FROM world.city as cities LEFT JOIN world.country as countries ON cities.CountryCode = countries.Code WHERE ${searchParamsKeys}
`, searchParamsValues)
                .then((data) => {
                const responseData = { totalElements: data[0].length, content: parseDBRecordToResponse(data[0]) };
                res.status(200).json(responseData);
            })
                .catch((err) => {
            });
        }
    }
};
exports.default = countriesController;
