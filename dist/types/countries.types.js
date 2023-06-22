"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseToDBParamsMap;
(function (ResponseToDBParamsMap) {
    ResponseToDBParamsMap["id"] = "ID";
    ResponseToDBParamsMap["cityName"] = "Name";
    ResponseToDBParamsMap["continent"] = "Continent";
    ResponseToDBParamsMap["countryCode"] = "CountryCode";
    ResponseToDBParamsMap["countryName"] = "Name";
    ResponseToDBParamsMap["population"] = "Population";
    ResponseToDBParamsMap["district"] = "District";
})(ResponseToDBParamsMap = exports.ResponseToDBParamsMap || (exports.ResponseToDBParamsMap = {}));
var ColumnKeyToTable;
(function (ColumnKeyToTable) {
    ColumnKeyToTable["cityName"] = "cities";
    ColumnKeyToTable["countryCode"] = "cities";
    ColumnKeyToTable["countryName"] = "countries";
    ColumnKeyToTable["continent"] = "countries";
    ColumnKeyToTable["population"] = "cities";
})(ColumnKeyToTable = exports.ColumnKeyToTable || (exports.ColumnKeyToTable = {}));
