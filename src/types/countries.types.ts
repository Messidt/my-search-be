export interface DBCityRecord {
    ID: number;
    Name: string;
    CountryCode: string;
    Population: number;
    District: string;
}

export interface ResponseCityRecord {
    id: number;
    name: string;
    countryCode: string;
    population: number;
    district: string;
}

export enum ResponseToDBParamsMap {
    id = 'ID',
    cityName = 'Name',
    countryCode = 'CountryCode',
    population = 'Population',
    district = 'District'
}