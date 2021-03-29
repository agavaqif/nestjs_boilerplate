
export function removeKey(obj: any,keyToRemove: any):any {
    let result = {...obj};
    delete result[keyToRemove];
    return result;
}

export function extractKeyFromError(s:string): string {
    let key:string = s.slice(s.indexOf("(")+1, s.indexOf(")"))
    return  key.charAt(0).toUpperCase() + key.slice(1)
}

export function buildUniqueConstraintError(detail: string){
    const result = {
        "isNotUnique": extractKeyFromError(detail)
    }
    return result;
}
 