import db from '../utils/db';
import { DBCityRecord, ResponseCityRecord, ResponseToDBParamsMap } from '../types/countries.types';
import { DictionaryType, DictonaryRecord } from '../types/dictionaries.types';

function parseDBDictionaryRecordToResponse(dbData: DictonaryRecord[], type: string): string[] {
    return dbData.map((elm: DictonaryRecord) => elm[type]);
}

const dictionariesController = {
    getCountries: (req: any, res: any, next: any) => {
        db.execute(`SELECT ${DictionaryType[req.query.type]} FROM world.country`)
        .then((data: [DBCityRecord[], any[]]) => {
            const responseData: string[] = parseDBDictionaryRecordToResponse(data[0], DictionaryType[req.query.type]);
            res.status(200).json(responseData);
        })
        .catch((err: any) => {
        });
        }
    
}

export default dictionariesController;