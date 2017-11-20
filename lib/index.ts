import * as peselManager from './pesel';

/**
 * Returns information if PESEL number is valid.
 *
 * @param {string} pesel
 * @returns {boolean}
 */
export const isValidPesel = (pesel: string): boolean => {
    return peselManager.isValid(pesel);
};

/**
 * Returns sex of person based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {boolean} - false: male; true: female
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getGenderFromPesel = (pesel: string): boolean => {
    return peselManager.getGender(pesel);
};

/**
 * Returns person's date of birth based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {number} date in UNIX time
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getDateOfBirthFromPesel = (pesel: string): number => {
    return peselManager.getDateOfBirth(pesel);
};