import {isValidRegon} from '../lib/index';

describe('REGON validation', () => {

    it('should validate REGON as incorrect (contain characters)', () => {
        const regon: string = '45031M214';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate REGON as incorrect (too long)', () => {
        const regon: string = '876600990955165';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate REGON as incorrect (too short)', () => {
        const regon: string = '89906834';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate REGON as incorrect (incorrect length)', () => {
        const regon: string = '238576282851';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate 9-digits REGON as incorrect (wrong checksum)', () => {
        const regon: string = '771064797';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate 14-digits REGON as incorrect (wrong checksum)', () => {
        const regon: string = '89860782125971';
        expect(isValidRegon(regon)).toBeFalsy();
    });

    it('should validate 9-digits REGON as correct', () => {
        const regon: string = '534462879';
        expect(isValidRegon(regon)).toBeTruthy();
    });

    it('should validate 14-digits REGON as correct', () => {
        const regon: string = '89589897641412';
        expect(isValidRegon(regon)).toBeTruthy();
    });

});