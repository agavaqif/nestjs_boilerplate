import { HttpStatus } from "@nestjs/common";
import { ResponseError } from "./response.class";




class ValidationError extends Error {
    private status:number = HttpStatus.BAD_REQUEST;
    private errors:ResponseError[];
    constructor(m: ResponseError[]) {
        super(); 
        this.errors =m
    }

    public getStatus(): number{
        return this.status;
    }

    public getErrors(): any {
        return this.errors;
    }

}

export {ValidationError}
