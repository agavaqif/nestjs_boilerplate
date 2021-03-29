import { ResponseError, ResponseObject } from "../response/response.entity"

export function buildErrorResponse(code: string, field: string, message:string): ResponseObject {
    let errors = [];
    let currentError:ResponseError = {
        code: code,
        field: field,
        message: message
    }
    errors.push(currentError);
    return new ResponseObject(false,{},errors);
}