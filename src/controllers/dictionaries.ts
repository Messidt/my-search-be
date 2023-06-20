import db from '../utils/db';
import { DBCityRecord, ResponseCityRecord, ResponseToDBParamsMap } from '../types/countries.types';
import { DictionaryType } from '../types/dictionaries.types';

function parseDBRecordToResponse(dbData: DBCityRecord[]) :ResponseCityRecord[] {
    return dbData
            .map((elm: DBCityRecord) => {
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
    getCountries: (req: any, res: any, next: any) => {
        console.log(req.query);
        db.execute(`SELECT ${DictionaryType[req.query.type]} FROM world.country`)
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: ResponseCityRecord[] = parseDBRecordToResponse(data[0]);
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
        });
        }
    
}

export default dictionariesController;