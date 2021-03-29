export interface ResponseError {
    code: string,
    field: string,
    message: string
}

export class ResponseObject {
    private     success: boolean;
    private     errors?: ResponseError[];
    private     payload?: any;
    constructor(success:boolean,payload:any={} ,errors:any[] = []) {
        this.success = success;
        this.errors  = errors;
        this.payload = payload;
    }
}