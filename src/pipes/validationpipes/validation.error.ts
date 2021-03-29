import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { ResponseError } from "src/shared/response/response.entity";




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
