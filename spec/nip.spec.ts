import {isValidNip} from '../lib/index';

describe('NIP validation', () => {

    it('should validate NIP as incorrect (contain characters)', () => {
        const nip: string = '78X7116D63';
        expect(isValidNip(nip)).toBeFalsy();
    });

    it('should validate NIP as incorrect (too long)', () => {
        const nip: string = '55214451968';
        expect(isValidNip(nip)).toBeFalsy();
    });

    it('should validate NIP as incorrect (too short)', () => {
        const nip: string = '735444987';
        expect(isValidNip(nip)).toBeFalsy();
    });

    it('should validate NIP as incorrect (wrong checksum)', () => {
        const nip: string = '1753431729';
        expect(isValidNip(nip)).toBeFalsy();
    });

    it('should validate NIP as correct', () => {
        const nip: string = '2453130767';
        expect(isValidNip(nip)).toBeTruthy();
    });

});