export const separatorJoin = (arr, separator = ", ") => {
    if (arr[0] && arr[0].length > 0)
        return (arr.map(x => JSON.stringify(x)).join(separator)).replaceAll('\"', '');
return ""
}
