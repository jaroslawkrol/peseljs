const PESEL_REGEXP = /^((00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-9]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})|((00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-9]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})|(((?!00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)\d{2})((([02468][13578]|[13579][02])(0[1-9]|[12][0-9]|3[01]))|(([02468]2)(0[1-9]|[12][0-8]))|(([02468][469]|[13579]1))(0[1-9]|[12][0-9]|3[0]))\d{5})$/g;
const PESEL_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

export const isValidPeselStructure = (pesel: string): boolean => {
    return PESEL_REGEXP.test(pesel);
};

export const isValidPeselChecksum = (pesel: string): boolean => {
    const array: number[] = convertToArray(pesel);
    let sum = 0;
    PESEL_WEIGHTS.map((weight, index) => {
        sum += weight * array[index];
    });
    return (10 - (sum % 10)) % 10 === array[10];
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
    return array;
};

export const convertToArray = (pesel: string): number[] => {
    const array: string[] = Object.assign([], pesel);
    return array.map((char) => {
        return Number(char)
    });
};