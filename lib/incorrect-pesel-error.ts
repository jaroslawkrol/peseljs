export class IncorrectPeselError extends Error {

    constructor(additionalMessage?: string) {
        let msg = 'Incorrect PESEL number';
        if (additionalMessage) {
            msg += ', reason: ' + additionalMessage;
        }
        super(msg);
    }

}