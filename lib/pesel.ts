import {IncorrectPeselError} from "./incorrect-pesel-error";
import {convertToArray, convertToDateArray, isValidPeselChecksum, isValidPeselStructure} from "./utils";

export const isValid = (pesel: string): boolean => {
    if(!pesel) return false;
    if(!isValidPeselStructure(pesel)) return false;
    return isValidPeselChecksum(pesel);
};

export const getGender = (pesel: string): boolean => {
    if(!isValid(pesel)) {
        throw new IncorrectPeselError();
    }
    const array = convertToArray(pesel);
    return array[9] % 2 === 0;
};

export const getDateOfBirth = (pesel: string): number => {
    if(!isValid(pesel)) {
        throw new IncorrectPeselError();
    }
    try {
        const array = convertToDateArray(pesel);
        return new Date(...array).getTime();
    } catch (e) {
        throw new IncorrectPeselError(e.message);
    }
};