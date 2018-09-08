// @dynamic
export class LengthConst {

    private static readonly values: {[key: string]: number} = {
        PESEL: 11,
        NIP: 10,
        REGON_OLD: 9,
        REGON_NEW: 14
    };

    public static getFor(type: string): number {
        return this.values[type];
    }

}