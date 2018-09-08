// @dynamic
export class ChecksumPositionConst {

    private static readonly values: {[key: string]: number} = {
        PESEL: 10,
        NIP: 9,
        REGON_OLD: 8,
        REGON_NEW: 13
    };

    public static getFor(type: string): number {
        return this.values[type];
    }

}