import {IncorrectPeselError} from "../lib/errors/incorrect-pesel.error";
import {getDateOfBirthFromPesel, getGenderFromPesel, isValidPesel, Pesel} from '../lib/index';
import {GenderType} from '../lib/enums/gender.enum';

const TestCases = {
    PeselValidation: {
        PESEL_CONTAIN_CHARACTERS: '91FF0X04035',
        PESEL_IS_TOO_LONG: '8804020788174',
        PESEL_IS_TOO_SHORT: '340111',
        PESEL_WRONG_CHECKSUM: '82042716472',
        PESEL_WRONG_BIRTH_DATE: '55170211395',
        PESEL_VALID: '80030504035'
    },
    GettingGenderTypeFromPesel: {
        PESEL_MALE: '92012101378',
        PESEL_FEMALE: '05222809303',
        PESEL_INVALID: '28072006691'
    },
    GettingBirthDate: {
        PESEL_INVALID: '28072006691',
        BORN_BEFORE_1970: {
            PESEL: '37061907858',
            DATE: new Date(1937, 5, 19).getTime()
        },
        BORN_IN_XX_CENTURY: {
            PESEL: '83040908183',
            DATE: new Date(1983, 3, 9).getTime()
        },
        BORN_IN_XXI_CENTURY: {
            PESEL: '07280401040',
            DATE: new Date(2007, 7, 4).getTime()
        }
    },
    PeselObject: {
        VALID: {
            PESEL: '92012101378',
            DATE: new Date(1992, 0, 21).getTime()
        },
        PESEL_INVALID: '28072006691'
    }
};

describe('PESEL validation', () => {

    const testCase = TestCases.PeselValidation;

    it('should validate PESEL as incorrect (contain characters)', () => {
        expect(isValidPesel(testCase.PESEL_CONTAIN_CHARACTERS)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too long)', () => {
        expect(isValidPesel(testCase.PESEL_IS_TOO_LONG)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (too short)', () => {
        expect(isValidPesel(testCase.PESEL_IS_TOO_SHORT)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong birthdate numbers)', () => {
        expect(isValidPesel(testCase.PESEL_WRONG_BIRTH_DATE)).toBeFalsy();
    });

    it('should validate PESEL as incorrect (wrong checksum)', () => {
        expect(isValidPesel(testCase.PESEL_WRONG_CHECKSUM)).toBeFalsy();
    });

    it('should validate PESEL as correct', () => {
        expect(isValidPesel(testCase.PESEL_VALID)).toBeTruthy();
    });


});

describe('Getting information (sex) from PESEL', () => {

    const Gender = {
        FEMALE: true,
        MALE: false
    };

    const testCase = TestCases.GettingGenderTypeFromPesel;

    it('should return sex (male) of the person having the pesel', () => {
        expect(getGenderFromPesel(testCase.PESEL_MALE)).toBe(Gender.MALE);
    });

    it('should return sex (female) of the person having the pesel', () => {
        expect(getGenderFromPesel(testCase.PESEL_FEMALE)).toBe(Gender.FEMALE);
    });

    it('should throw error because wrong PESEL checksum', () => {
        const fun = () => {
            return getGenderFromPesel(testCase.PESEL_INVALID)
        };
        expect(fun).toThrow(new IncorrectPeselError())
    });

});

describe('Getting information (date of birth) from PESEL', () => {

    const testCase = TestCases.GettingBirthDate;

    it('should return date of birth of the person having the pesel', () => {
        const person = testCase.BORN_IN_XX_CENTURY;
        expect(getDateOfBirthFromPesel(person.PESEL)).toEqual(person.DATE);
    });

    it('should return date of birth (before 1970) of the person having the pesel', () => {
        const person = testCase.BORN_BEFORE_1970;
        expect(getDateOfBirthFromPesel(person.PESEL)).toEqual(person.DATE);
    });

    it('should return date of birth (after 1999) of the person having the pesel', () => {
        const person = testCase.BORN_IN_XXI_CENTURY;
        expect(getDateOfBirthFromPesel(person.PESEL)).toEqual(person.DATE);
    });

    it('should throw error because wrong PESEL format', () => {
        const fun = () => {
            return getDateOfBirthFromPesel(testCase.PESEL_INVALID)
        };
        expect(fun).toThrow(new IncorrectPeselError())
    });

});

describe('Creating object of Pesel type with information', () => {

    const testCase = TestCases.PeselObject;

    it('should create a empty Pesel object', () => {
        const pesel = new Pesel();
        expect(pesel instanceof Pesel).toBe(true, 'instance of Pesel');
        expect(pesel.value).toEqual(jasmine.any(String));
        expect(pesel.value).toEqual('');
        expect(pesel.isValid).toBeFalsy();
        expect(pesel.birthDate).toBeNull();
        expect(pesel.gender).toBeNull();
    });

    it('should create a invalid Pesel object', () => {
        const pesel = new Pesel(testCase.PESEL_INVALID);
        expect(pesel instanceof Pesel).toBe(true, 'instance of Pesel');
        expect(pesel.value).toEqual(testCase.PESEL_INVALID);
        expect(pesel.isValid).toBeFalsy();
        expect(pesel.birthDate).toBeNull();
        expect(pesel.gender).toBeNull();
    });

    it('should create a correct Pesel object', () => {
        const pesel = new Pesel(testCase.VALID.PESEL);
        expect(pesel instanceof Pesel).toBe(true, 'instance of Pesel');
        expect(pesel.value).toEqual(testCase.VALID.PESEL);
        expect(pesel.isValid).toBeTruthy();
        expect(pesel.birthDate).toEqual(testCase.VALID.DATE);
        expect(pesel.gender).toEqual(GenderType.MALE);
    });

    it('should update a Pesel object (as correct)', () => {
        const pesel = new Pesel();
        expect(pesel instanceof Pesel).toBe(true, 'instance of Pesel');
        pesel.value = testCase.VALID.PESEL;
        expect(pesel.value).toEqual(testCase.VALID.PESEL);
        expect(pesel.isValid).toBeTruthy();
        expect(pesel.birthDate).toEqual(testCase.VALID.DATE);
        expect(pesel.gender).toEqual(GenderType.MALE);
    });

    it('should update a Pesel object (as incorrect)', () => {
        const pesel = new Pesel(testCase.VALID.PESEL);
        expect(pesel instanceof Pesel).toBe(true, 'instance of Pesel');
        pesel.value = testCase.PESEL_INVALID;
        expect(pesel.value).toEqual(testCase.PESEL_INVALID);
        expect(pesel.isValid).toBeFalsy();
        expect(pesel.birthDate).toBeNull();
        expect(pesel.gender).toBeNull();
    });

});