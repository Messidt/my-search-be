import db from '../utils/db';
import { DBCityRecord, ResponseCityRecord, ResponseToDBParamsMap } from '../types/countries.types';

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

const countriesController = {
    getCountries: (req: any, res: any, next: any) => {
        // console.log(req.query);
        if(!Object.keys(req.query).length) {
            db.execute('SELECT * FROM world.city')
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: ResponseCityRecord[] = parseDBRecordToResponse(data[0]);
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
    
        });
        } else {
            const searchParamsKeys = Object.keys(req.query).map((key: string) => `city.${ResponseToDBParamsMap[key]} = ?`).join(' AND ');
            const searchParamsValues = Object.keys(req.query).map((key: string) => req.query[key]);
            db.execute(`SELECT * FROM world.city WHERE ${searchParamsKeys}` , searchParamsValues)
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: ResponseCityRecord[] = parseDBRecordToResponse(data[0]);
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
        });

        }
        
    }
}

export default countriesController;