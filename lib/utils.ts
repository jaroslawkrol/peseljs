export const TypeConstants: {[key: string]: string} = {
    PESEL: 'PESEL',
    NIP: 'NIP',
    REGON_OLD: 'REGON_OLD',
    REGON_NEW: 'REGON_NEW'
};

const RegexpConstants: {[key: string]: RegExp} = {
    PESEL: /^((00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-9]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})|((00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-9]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})|(((?!00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)\d{2})((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-8]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})$/m,
    NIP: /^\d{10}$/m,
    REGON_OLD: /^\d{9}$/m,
    REGON_NEW: /^\d{14}$/m,
};

const LengthConstants: {[key: string]: number} = {
    PESEL: 11,
    NIP: 10,
    REGON_OLD: 9,
    REGON_NEW: 14
};

const WeightsConstants: {[key: string]: number[]} = {
    PESEL: [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
    NIP: [6, 5, 7, 2, 3, 4, 5, 6, 7],
    REGON_OLD: [8, 9, 2, 3, 4, 5, 6, 7],
    REGON_NEW: [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]
};

const ChecksumPositionConstants: {[key: string]: number} = {
    PESEL: 10,
    NIP: 9,
    REGON_OLD: 8,
    REGON_NEW: 13
};

const Algorithms: {[key: string]: Function} = {
    PESEL: (sum: number, checksum: number) => {
        return (10 - (sum % 10)) % 10 === checksum;
    },
    NIP: (sum: number, checksum: number) => {
        return sum % 11 === checksum;
    },
    REGON_OLD: (sum: number, checksum: number) => {
        return ((sum % 11) % 10) === checksum;
    },
    REGON_NEW: (sum: number, checksum: number) => {
        return ((sum % 11) % 10) === checksum;
    }
};

export const convertToDateArray = (pesel: string): number[] => {
    const array = [Number(pesel.slice(0, 2)), Number(pesel.slice(2, 4)), Number(pesel.slice(4, 6))];
    switch (true) {
        case (array[1] <= 12):
            array[0] += 1900;
            break;
        case (array[1] <= 32):
            array[0] += 2000;
            array[1] -= 20;
            break;
        case (array[1] <= 52):
            array[0] += 2100;
            array[1] -= 40;
            break;
        case (array[1] <= 72):
            array[0] += 2200;
            array[1] -= 60;
            break;
        case (array[1] <= 92):
            array[0] += 1800;
            array[1] -= 80;
            break;
        default:
            throw new Error('Incorrect month');
    }
    array[1] -= 1;
    return array;
};

export const convertToArray = (value: string): number[] => {
    return (<any>Array).from(value, (char: string) => {
        return Number(char);
    });
};

export const isValidStructure = (value: string, type: string): boolean => {
    return isCorrectLength(value, LengthConstants[type]) && isCorrectPattern(value, RegexpConstants[type]);
};

const isCorrectLength = (value: string, length: number): boolean => {
    return value.length === length;
};

const isCorrectPattern = (value: string, regExp: RegExp): boolean => {
    return regExp.test(value);
};

export const isValidChecksum = (value: string, type: string): boolean => {
    const array: number[] = convertToArray(value);
    const sum: number = calculateSum(array, WeightsConstants[type]);
    const checksum: number = array[ChecksumPositionConstants[type]];
    return isCorrectChecksum(Algorithms[type], [sum, checksum]);
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