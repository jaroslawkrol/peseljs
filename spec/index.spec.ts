import {isCorrectPesel} from "../lib/index";

describe('Main features', () => {

    it('should validate PESEL as correct', () => {
        const pesel: string = '92012101378';
        const result: boolean = isCorrectPesel(pesel);
        expect(result).toBeTruthy();
    });

});