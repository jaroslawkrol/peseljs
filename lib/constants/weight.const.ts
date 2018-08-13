export class WeightConst {

    private static readonly values: { [key: string]: number[] } = {
        PESEL: [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
        NIP: [6, 5, 7, 2, 3, 4, 5, 6, 7],
        REGON_OLD: [8, 9, 2, 3, 4, 5, 6, 7],
        REGON_NEW: [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8]
    };

    public static getFor(type: string): number[] {
        return this.values[type];
    }

}