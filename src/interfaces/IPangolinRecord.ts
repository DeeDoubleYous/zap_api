import { ILocation } from './ILocations';

/**
 * The type of the Pangolin Records that mimics the database table for the purposes of getting a predictable object from the database
 */
export interface IPangolinRecord {
    id: number,
    time: Date,
    imageUrl: string,
    isDead: boolean,
    location: ILocation,
    deathType?: string,
    note?: string,
}