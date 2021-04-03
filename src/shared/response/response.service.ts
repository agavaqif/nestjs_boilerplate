
import { ResponseObject,ResponseError} from './response.class';


/**
 * Builds Array of ResponseError Objects
 * @param code 
 * @param field 
 * @param message 
 * @returns 
 */
export function buildErrors(code: string, field: string, message:string) {
    let errors = [];
    let currentError:ResponseError = {
        code: code,
        field: field,
        message: message
    }
    errors.push(currentError);
    return errors;
}

/**
 * Builds Error Response out of error details
 * @param code 
 * @param field 
 * @param message 
 * @returns 
 */
export function buildErrorResponse(code: string, field: string, message:string): ResponseObject {
    let errors = buildErrors(code,field,message);
    return new ResponseObject(false,{},errors);
}

/**
 * Build Success Response from object
 * @param obj 
 * @returns 
 */
export function buildSuccessResponse(obj: any) {
    return new ResponseObject(true,obj,[]);
}