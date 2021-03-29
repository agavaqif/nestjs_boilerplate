import { ResponseError } from "../response/response.entity";

export class ClientMessages {
    public static USER_NF: ResponseError = {
        code:'userNotFound',
        field: 'email',
        message: "User Not Found"
    }
    public static PASS_WR : ResponseError = {
        code: 'wrongPassword',
        field: 'password',
        message: 'Password is wrong'
    }
}