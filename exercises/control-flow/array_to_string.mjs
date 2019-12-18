export function arrayToString(colors) {
    let result = '';
    for (const [index, elem] of colors.entries()) {
        if(index > 0) result += '\n'; result += `${index + 1}. ${elem}`;
    }
    return result;
}