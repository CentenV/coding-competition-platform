
/**
 * Converts and validates the id passed into all Rest API requests
 * 
 * @param toBeConverted 
 * @throws IdConversionError, id was in an invalid format
 */
export function convertToId(toBeConverted: any): number {
    const convertedNumber: number = parseInt(toBeConverted);
    if (Number.isNaN(convertedNumber) || convertedNumber === null) {
        throw new IdConversionError(); 
    }

    return convertedNumber;
}

export class IdConversionError extends Error {
    constructor() {
        super("id was in an invalid format");
    }
}