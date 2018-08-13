import {IdentifierType} from '../enums/identifier-type.enum';
import * as ValidationUtils from '../utils/validation.utils';

export const isValid = (regon: string): boolean => {
    if (!regon) return false;
    if (isValidOldRegonStructure(regon)) {
        return isValidOldRegonChecksum(regon);
    } else if (isValidNewRegonStructure(regon)) {
        return isValidNewRegonChecksum(regon);
    }
    return false;
};

const isValidOldRegonStructure = (regon: string): boolean => {
    return ValidationUtils.isValidStructure(regon, IdentifierType.REGON_OLD);
}

const isValidNewRegonStructure = (regon: string): boolean => {
    return ValidationUtils.isValidStructure(regon, IdentifierType.REGON_NEW);
};

const isValidOldRegonChecksum = (regon: string): boolean => {
    return ValidationUtils.isValidChecksum(regon, IdentifierType.REGON_OLD);
};

const isValidNewRegonChecksum = (regon: string): boolean => {
    return ValidationUtils.isValidChecksum(regon, IdentifierType.REGON_OLD) && ValidationUtils.isValidChecksum(regon, IdentifierType.REGON_NEW);
};