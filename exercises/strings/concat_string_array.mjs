export function concatStringArray(string) {
    let stringConcat = '';
    for (const str of string) {
        stringConcat += str;
    }
    return stringConcat;
}