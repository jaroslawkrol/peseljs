import {getDateOfBirth, getGender, isValid} from "../lib/pesel";
import {IncorrectPeselError} from "../lib/incorrect-pesel-error";

describe('PESEL validation', () => {

    it('should validate PESEL as incorrect (contain characters)', () => {
        const pesel: string = '91FF0X04035';
        expect(isValid(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too long)', () => {
        const pesel: string = '8804020788174';
        expect(isValid(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too short)', () => {
        const pesel: string = '340111';
        expect(isValid(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong birthdate numbers)', () => {
        const pesel: string = '55170211395';
        expect(isValid(pesel)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong checksum)', () => {
        const pesel: string = '82042716472';
        expect(isValid(pesel)).toBeFalsy();
    });

    it('should validate PESEL as correct', () => {
        const pesel: string = '80030504035';
        expect(isValid(pesel)).toBeTruthy();
    });


});

describe('Getting information (sex) from PESEL', () => {

    const MALE = false;
    const FEMALE = true;

    it('should return sex (male) of the person having the pesel', () => {
        const pesel: string = '92012101378';
        expect(getGender(pesel)).toBe(MALE);
    });

    it('should return sex (female) of the person having the pesel', () => {
        const pesel: string = '05222809303';
        expect(getGender(pesel)).toBe(FEMALE);
    });

    it('should throw error because wrong PESEL checksum', () => {
        const pesel: string = '28072006691';
        const fun = () => {
            return getGender(pesel)
        }
        expect(fun).toThrow(new IncorrectPeselError())
    });

});

describe('Getting information (date of birth) from PESEL', () => {

    it('should return date of birth of the person having the pesel', () => {
        const pesel: string = '83040908183';
        const unixTime: number = new Date(1983, 3, 9).getTime();
        expect(getDateOfBirth(pesel)).toEqual(unixTime);
    });

    it('should return date of birth (before 1970) of the person having the pesel', () => {
        const pesel: string = '37061907858';
        const unixTime: number = new Date(1937, 5, 19).getTime();
        expect(getDateOfBirth(pesel)).toEqual(unixTime);
    });

    it('should return date of birth (after 1999) of the person having the pesel', () => {
        const pesel: string = '07280401040';
        const unixTime: number = new Date(2007, 7, 4).getTime();
        expect(getDateOfBirth(pesel)).toEqual(unixTime);
    });

    it('should throw error because wrong PESEL format', () => {
        const pesel: string = '072804010401';
        const fun = () => {
            return getDateOfBirth(pesel)
        }
        expect(fun).toThrow(new IncorrectPeselError())
    });

});