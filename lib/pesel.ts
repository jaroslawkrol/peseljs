export class Pesel {

    _pesel: string;

    constructor(pesel: string) {
        this.pesel = pesel;
    }

    get pesel(): string {
        return this._pesel;
    }

    set pesel(pesel: string) {
        this._pesel = pesel;
    }
    
}