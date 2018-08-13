import {IncorrectPeselError} from '../errors/incorrect-pesel.error';
import * as ValidationUtils from '../utils/validation.utils';
import * as ConversionUtils from '../utils/conversion.utils';
import {IdentifierType} from '../enums/identifier-type.enum';

export const isValid = (pesel: string): boolean => {
    if (!pesel) return false;
    if (!isValidPeselStructure(pesel)) return false;
    return isValidPeselChecksum(pesel);
};

export const getGender = (pesel: string, noCheck?: boolean): boolean => {
    if (!noCheck && !isValid(pesel)) {
        throw new IncorrectPeselError();
    }
    const array = ConversionUtils.convertToArray(pesel);
    return array[9] % 2 === 0;
};

export const getDateOfBirth = (pesel: string, noCheck?: boolean): number => {
    if (!noCheck && !isValid(pesel)) {
        throw new IncorrectPeselError();
    }
    try {
        const array = ConversionUtils.convertToDateArray(pesel);
        return new Date(...array).getTime();
    } catch (e) {
        throw new IncorrectPeselError(e.message);
    }
};

const isValidPeselStructure = (pesel: string): boolean => {
    return ValidationUtils.isValidStructure(pesel, IdentifierType.PESEL);
};

const isValidPeselChecksum = (pesel: string): boolean => {
    return ValidationUtils.isValidChecksum(pesel, IdentifierType.PESEL);
};