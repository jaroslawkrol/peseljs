import {isValidChecksum, isValidStructure, TypeConstants} from './utils';

export const isValid = (regon: string): boolean => {
    if(!regon) return false;
    if (isValidOldRegonStructure(regon)) {
        return isValidOldRegonChecksum(regon);
    } else if (isValidNewRegonStructure(regon)) {
        return isValidNewRegonChecksum(regon);
    }
    return false;
};

const isValidOldRegonStructure = (regon: string): boolean => {
    return isValidStructure(regon, TypeConstants.REGON_OLD);
};


const isValidNewRegonStructure = (regon: string): boolean => {
    return isValidStructure(regon, TypeConstants.REGON_NEW);
};

const isValidOldRegonChecksum = (regon: string): boolean => {
    return isValidChecksum(regon, TypeConstants.REGON_OLD);
};

const isValidNewRegonChecksum = (regon: string): boolean => {
    return isValidChecksum(regon, TypeConstants.REGON_OLD) && isValidChecksum(regon, TypeConstants.REGON_NEW);
};