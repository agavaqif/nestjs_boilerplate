export interface Response {
    type: ResponseType;
    status: number;
    payload: any;
}

export enum ResponseType {
    SUCCESS = 'success',
    ERROR = 'error',
    ALERT = 'alert'
}


export class ResponseObject {
    private     type: ResponseType;
    private     status: number;
    private     payload: any;
    constructor(type: ResponseType,status: number,payload: any ) {
        this.type = type;
        this.status = status;
        this.payload = payload;
    }
}