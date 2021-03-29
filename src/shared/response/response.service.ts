
import { ResponseObject} from './response.entity';

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