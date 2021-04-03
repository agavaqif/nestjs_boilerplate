# nestjs_boilerplate
Boilerplate Code for NestJs Based Projects [DB:Pg, ORM:TypeOrm]

# Environment
Create env folder under src

dev.env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=


# Folder Structure

- config: Config server based on evironment variables
- enums: Application constants, including app config values, error codes and messages and etc.
- env: Environment Variables
- filters: Folder for NestJs Filters
- interceptors: Folder for NestJs Interceptors
- pipe: Folder for NestJs Pipes
- resources: Type Orm Entity Modules
- shared
    - auth: Auth module to manage user authorisation and authentication
    - response: Service and classes to manage api response including success, server error and validation error responses
    - utils: Generic util funcitonality

# Entity Validation

Entties are validated by using class-validator package. Validation failures are caught by CustomValidationPipe 
which locates in 'pipes/validation.pipes.ts'. CustomValidationPipe basically generate and throws ValidationError which is caught and dealth with by AllExceptionFilter.
In case class-validator does not have proper functionality for business case custom validators can be created.
Check user.validator.ts file for sample implementation

# Exception Handling

All exceptions are being handled by AllExceptionFilter which is located in 'filters/allexception/all-execption.filter.ts
To add different handlers this file should be modified.