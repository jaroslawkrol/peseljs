import {isValidChecksum, isValidStructure, TypeConstants} from './utils';

export const isValid = (nip: string): boolean => {
    if(!nip) return false;
    if(!isValidNipStructure(nip)) return false;
    return isValidNipChecksum(nip);
};

const isValidNipStructure = (nip: string): boolean => {
    return isValidStructure(nip, TypeConstants.NIP);
};

const isValidNipChecksum = (nip: string): boolean => {
    return isValidChecksum(nip, TypeConstants.NIP);
};