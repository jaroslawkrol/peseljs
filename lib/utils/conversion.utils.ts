export const convertToArray = (value: string): number[] => {
    return (<any>Array).from(value, (char: string) => {
        return Number(char);
    });
};

// TODO: to separate peselUtil
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