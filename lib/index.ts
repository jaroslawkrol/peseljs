import * as peselManager from './pesel';
import * as nipManager from './nip';
import * as regonManager from './regon';

module PeselJS {
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

    /**
     * Returns information if NIP number is valid.
     *
     * @param {string} nip
     * @returns {boolean}
     */
    export const isValidNip = (nip: string): boolean => {
        return nipManager.isValid(nip);
    };

    /**
     * Returns information if REGON number is valid.
     *
     * @param {string} regon
     * @returns {boolean}
     */
    export const isValidRegon = (regon: string): boolean => {
        return regonManager.isValid(regon);
    };
}

