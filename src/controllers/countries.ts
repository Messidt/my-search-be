import db from '../utils/db';
import { ColumnKeyToTable, DBCityRecord, ResponseCityRecord, ResponseToDBParamsMap } from '../types/countries.types';

function parseDBRecordToResponse(dbData: DBCityRecord[]) :ResponseCityRecord[] {
    return dbData
            .map((elm: DBCityRecord) => {
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

function checkQueryForParams(queries: {[key: string]: string}) {
    const paginationKeys = ['pageIndex', 'pageSize'];
    const pagination = {pageIndex: 0, pageSize: 0};
    const searchFields = {}
    Object.keys(queries)
    .forEach((key: string) => {
        if(paginationKeys.includes(key)) {
            pagination[key] = queries[key];
        } else {
            searchFields[key] = queries[key];
        }
    })
}

const countriesController = {
    getCountries: (req: any, res: any, next: any) => {
        checkQueryForParams(req.query);
        if(!Object.keys(req.query).length) {
            db.execute(`SELECT cities.name as cityName, countries.name as countryName, countries.code as countryCode, countries.continent as continent, cities.population as population
            FROM world.city as cities
            LEFT JOIN world.country as countries ON cities.CountryCode = countries.Code`)
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: {totalElements: number, content: ResponseCityRecord[]} = {totalElements: data[0].length, content: parseDBRecordToResponse(data[0])};
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
    
        });
        } else {
            const searchParamsKeys = Object.keys(req.query).map((key: string) => `${ColumnKeyToTable[key]}.${ResponseToDBParamsMap[key]} = ?`).join(' AND ');
            const searchParamsValues = Object.keys(req.query).map((key: string) => req.query[key]);
            console.log(req.query, searchParamsKeys, searchParamsValues);
            db.execute(`SELECT cities.name as cityName, countries.name as countryName, countries.code as countryCode, countries.continent as continent, cities.population as population
            FROM world.city as cities LEFT JOIN world.country as countries ON cities.CountryCode = countries.Code WHERE ${searchParamsKeys}
` , searchParamsValues)
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: {totalElements: number, content: ResponseCityRecord[]} = {totalElements: data[0].length, content: parseDBRecordToResponse(data[0])};
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
        });

        }
        
    }
}

export default countriesController;