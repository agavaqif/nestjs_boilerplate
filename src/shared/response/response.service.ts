
import {Response, ResponseObject,ResponseType} from './response.entity';

export function returnResource(resource: any) :ResponseObject {
    return new ResponseObject(ResponseType.SUCCESS, 200, resource);
    
}

export function returnAlert(message: string): ResponseObject {
    return new ResponseObject(ResponseType.ALERT, 200, message)
}