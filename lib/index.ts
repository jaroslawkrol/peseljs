import * as peselService from './services/pesel.service';
import * as nipService from './services/nip.service';
import * as regonService from './services/regon.service';
import {GenderType} from './enums/gender.enum';

/**
 * Returns information if PESEL number is valid.
 *
 * @param {string} pesel
 * @returns {boolean}
 */
export const isValidPesel = (pesel: string): boolean => {
    return peselService.isValid(pesel);
};

/**
 * Returns sex of person based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {boolean} - false: male; true: female
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getGenderFromPesel = (pesel: string): boolean => {
    return peselService.getGender(pesel);
};

/**
 * Returns person's date of birth based on the PESEL number.
 *
 * @param {string} pesel
 * @returns {number} date in UNIX time
 * @throws #IncorrectPeselError if PESEL is incorrect
 */
export const getDateOfBirthFromPesel = (pesel: string): number | null => {
    return peselService.getDateOfBirth(pesel);
};

/**
 * Returns information if NIP number is valid.
 *
 * @param {string} nip
 * @returns {boolean}
 */
export const isValidNip = (nip: string): boolean => {
    return nipService.isValid(nip);
};

/**
 * Returns information if REGON number is valid.
 *
 * @param {string} regon
 * @returns {boolean}
 */
export const isValidRegon = (regon: string): boolean => {
    return regonService.isValid(regon);
};


export abstract class Identifier {

    private _validator: Function;
    private validate = (value: string) => {
        this._isValid = this._validator(value) ? this.success(value) : this.fail();
    };

    constructor(value: string, validator: Function) {
        this._validator = validator;
        this.value = value;
    }

    private _value: string = '';

    public get value(): string {
        return this._value;
    }

    public set value(value: string) {
        this._value = value;
        this.validate(value);
    }

    private _isValid: boolean = false;

    public get isValid(): boolean {
        return this._isValid;
    }

    protected abstract success(value: string): true;

    protected abstract fail(): false;

}

export class Pesel extends Identifier {

    constructor(value: string = '') {
        super(value, peselService.isValid);
    }

    private _gender: string | null;

    public get gender(): string | null {
        return this._gender;
    }

    private _birthDate: number | null;

    public get birthDate(): number | null {
        return this._birthDate;
    }

    protected success(value: string): true {
        this._gender = peselService.getGender(value, true) ? GenderType.FEMALE : GenderType.MALE;
        this._birthDate = peselService.getDateOfBirth(value, true);
        return true;
    }

    protected fail(): false {
        this._gender = null;
        this._birthDate = null;
        return false;
    }
}

export class Nip extends Identifier {

    constructor(value: string = '') {
        super(value, nipService.isValid);
    }

    protected success(value: string): true {
        return true;
    }

    protected fail(): false {
        return false;
    }

}

export class Regon extends Identifier {

    constructor(value: string = '') {
        super(value, regonService.isValid);
    }

    protected success(value: string): true {
        return true;
    }

    protected fail(): false {
        return false;
    }

}