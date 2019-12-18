export function numberToMonth(number) {
    switch (number) {
        case 1:
            return 'January';
        default:
            throw new Error('Unknown number: ' + number);
    }
}