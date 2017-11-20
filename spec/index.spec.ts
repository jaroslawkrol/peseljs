import {getDateOfBirthFromPesel, getSexFromPesel, isCorrectPesel} from "../lib/index";
import {IncorrectPeselError} from "../lib/incorrect-pesel-error";

describe('PESEL validation', () => {

    it('should validate PESEL as incorrect (contain characters)', () => {
        const pesel: string = '91FF0X04035';
        expect(isCorrectPesel(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too long)', () => {
        const pesel: string = '8804020788174';
        expect(isCorrectPesel(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too short)', () => {
        const pesel: string = '340111';
        expect(isCorrectPesel(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong birthdate numbers)', () => {
        const pesel: string = '55170211395';
        expect(isCorrectPesel(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong checksum)', () => {
        const pesel: string = '82042716472';
        expect(isCorrectPesel(pesel)).toBeFalsy();
    });

    it('should validate PESEL as correct', () => {
        const pesel: string = '80030504035';
        expect(isCorrectPesel(pesel)).toBeTruthy();
    });


});

describe('Getting information (sex) from PESEL', () => {

    const MALE = false;
    const FEMALE = true;

    it('should return sex (male) of the person having the pesel', () => {
        const pesel: string = '92012101378';
        expect(getSexFromPesel(pesel)).toBe(MALE);
    });

    it('should return sex (female) of the person having the pesel', () => {
        const pesel: string = '05222809303';
        expect(getSexFromPesel(pesel)).toBe(FEMALE);
    });

    it('should throw error because wrong PESEL checksum', () => {
        const pesel: string = '28072006691';
        const fun = () => {
            return getSexFromPesel(pesel)
        }
        expect(fun).toThrow(new IncorrectPeselError())
    });

});

describe('Getting information (date of birth) from PESEL', () => {

    it('should return date of birth of the person having the pesel', () => {
        const pesel: string = '83040908183';
        expect(getDateOfBirthFromPesel(pesel)).toEqual(418687200000);
    });

    it('should return date of birth (before 1970) of the person having the pesel', () => {
        const pesel: string = '37061907858';
        expect(getDateOfBirthFromPesel(pesel)).toEqual(-1026784800000);
    });

    it('should return date of birth (after 1999) of the person having the pesel', () => {
        const pesel: string = '07280401040';
        expect(getDateOfBirthFromPesel(pesel)).toEqual(1186178400000);
    });

    it('should throw error because wrong PESEL format', () => {
        const pesel: string = '072804010401';
        const fun = () => {
            return getDateOfBirthFromPesel(pesel)
        }
        expect(fun).toThrow(new IncorrectPeselError())
    });

});