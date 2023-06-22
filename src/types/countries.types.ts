export interface DBCityRecord {
    id: number;
    cityName: string;
    countryName: string;
    countryCode: string;
    continent: string;
    population: number;
    district: string;
}

export interface ResponseCityRecord {
    id: number;
    cityName: string;
    countryName: string;
    countryCode: string;
    population: number;
    district: string;
}

export enum ResponseToDBParamsMap {
    id = 'ID',
    cityName = 'Name',
    continent = 'Continent',
    countryCode = 'CountryCode',
    countryName = 'Name',
    population = 'Population',
    district = 'District'
}

export enum ColumnKeyToTable {
    cityName = 'cities',
    countryCode = 'cities',
    countryName = 'countries',
    continent = 'countries',
    population = 'cities'
}