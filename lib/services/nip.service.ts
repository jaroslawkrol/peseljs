import * as ValidationUtils from '../utils/validation.utils';
import {IdentifierType} from '../enums/identifier-type.enum';

export const isValid = (nip: string): boolean => {
    if(!nip) return false;
    if(!isValidNipStructure(nip)) return false;
    return isValidNipChecksum(nip);
};

const isValidNipStructure = (nip: string): boolean => {
    return ValidationUtils.isValidStructure(nip, IdentifierType.NIP);
};

const isValidNipChecksum = (nip: string): boolean => {
    return ValidationUtils.isValidChecksum(nip, IdentifierType.NIP);
};