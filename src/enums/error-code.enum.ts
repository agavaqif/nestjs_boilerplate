export  enum ErrorCode {
    NOT_FOUND = "notFound",
    NOT_UNIQUE = "notUnique",
    SERVER_ERROR = "serverError",
    NO_DATA = "noData",
    CANT_UPDATE = "cantUpdate",
    IS_WRONG = "isWrong",
    UNAUTH = "unAuthorized"
}

export  enum ErrorMessage {
    EMAIL_EXIST = "email must be unique",
    EMAIL_NOT_FOUND = "email not found",
    PASSWORD_WRONG = "password is wrong",
    EMAIL_CANT_UPDATE = "email can not be updated",
    NOT_FOUND = "resource was not found",
    NOT_UNIQUE = "resource must be unique",    
    SERVER_ERROR = "Server Error",
    NO_DATA = "no Data Provided",    
    UNAUTH = "Unauthorized" 
}