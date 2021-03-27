
export function removeKey(obj: any,keyToRemove: any):any {
    let result = {...obj};
    delete result[keyToRemove];
    return result;
}