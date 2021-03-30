
import { ResponseObject,ResponseError} from './response.entity';

export function returnResource(resource: any) :ResponseObject {
    return new ResponseObject(true, resource);    
}

export function returnAlert(code: string, title: string, detail: string): ResponseObject {
    let errors = [{
        code: code,
        title: title,
        detail: detail
    }]
    return new ResponseObject(true, errors);    
}


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

export function buildSuccessResponse(obj: any) {
    return new ResponseObject(true,obj,[]);
}