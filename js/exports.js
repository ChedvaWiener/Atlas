export const separatorJoin = (arr, separator = ", ") =>
    (arr.map(x => JSON.stringify(x)).join(separator)).replaceAll('\"', '');

