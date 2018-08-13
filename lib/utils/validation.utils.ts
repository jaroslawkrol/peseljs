import {WeightConst} from '../constants/weight.const';
import {IdentifierType} from '../enums/identifier-type.enum';
import {LengthConst} from '../constants/length.const';
import {RegexpConst} from '../constants/regexp.const';
import {ChecksumPositionConst} from '../constants/checksum-position.const';
import {CheckConst} from '../constants/check.const';
import {convertToArray} from './conversion.utils';

export const isValidStructure = (value: string, type: IdentifierType): boolean => {
    return isCorrectLength(value, LengthConst.getFor(type)) && isCorrectPattern(value, RegexpConst.getFor(type));
};

export const isValidChecksum = (value: string, type: IdentifierType): boolean => {
    const array: number[] = convertToArray(value);
    const sum: number = calculateSum(array, WeightConst.getFor(type));
    const checksum: number = array[ChecksumPositionConst.getFor(type)];
    return isCorrectChecksum(CheckConst.getFor(type), [sum, checksum]);
};

const isCorrectLength = (value: string, length: number): boolean => {
    return value.length === length;
};

const isCorrectPattern = (value: string, regExp: RegExp): boolean => {
    return regExp.test(value);
};

const isCorrectChecksum = (callback: Function, options: any[]): boolean => {
    return callback(...options);
};

const calculateSum = (array: number[], weights: number[]): number => {
    let sum = 0;
    weights.map((weight, index) => {
        sum += weight * array[index];
    });
    return sum;
};