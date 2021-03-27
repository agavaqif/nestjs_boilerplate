export interface Response {
    type: ResponseType;
    statusCode: number;
    payload: any;
}

export enum ResponseType {
    SUCCESS = 'success',
    ERROR = 'error',
    ALERT = 'alert'
}


export class ResponseObject {
    private     type: ResponseType;
    private     statusCode: number;
    private     payload: any;
    constructor(type: ResponseType,statusCode: number,payload: any ) {
        this.type = type;
        this.statusCode = statusCode;
        this.payload = payload;
    }
}