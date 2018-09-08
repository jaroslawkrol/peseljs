// @dynamic
export class CheckConst {

    private static readonly values: {[key: string]: Function} = {
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

    public static getFor(type: string): Function {
        return this.values[type];
    }

}