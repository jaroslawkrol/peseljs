import {IncorrectPeselError} from "./incorrect-pesel-error";
import {convertToArray, convertToDateArray, isValidPeselChecksum, isValidPeselStructure} from "./utils";

/**
 * Returns information if PESEL number is valid.
 *
 * @param {string} pesel
 * @returns {boolean}
 */
export const isCorrectPesel = (pesel: string): boolean => {
    if(!pesel) return false;
    if(!isValidPeselStructure(pesel)) return false;
    return isValidPeselChecksum(pesel);
};

/**
 * Returns sex of person based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {boolean} - false: male; true: female
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getSexFromPesel = (pesel: string): boolean => {
    if(!isCorrectPesel(pesel)) {
        throw new IncorrectPeselError();
    }
    const array = convertToArray(pesel);
    return array[9] % 2 === 0;
};

/**
 * Returns person's date of birth based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {Date}
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getDateOfBirthFromPesel = (pesel: string): number => {
    if(!isCorrectPesel(pesel)) {
        throw new IncorrectPeselError();
    }
    try {
        const array = convertToDateArray(pesel);
        return new Date(...array).getTime();
    } catch (e) {
        throw new IncorrectPeselError(e.message);
    }
};