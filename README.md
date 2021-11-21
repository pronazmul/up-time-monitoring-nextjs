<p align="center"> 
 <h1 align="center">NextJs Uptime Monitoring Application!</h1>
</p> 

### Key Features:  
    - A user can signin/signup.
    - Can store a number of valid url on server.
    - A Dynamic backend process will check url status each 5 second.
    - User will get up/down status on their profile.

#### Frontend Techonology:  
    - Nextjs - Frontend React Framework.
    - TailwindCSS - Utility based css framework.
    - SWR - react hook packege.
    - Formik - From data manage packege.
    - yup - Frontend Data validation schema.
    - axios - Ajax library to asyncrnous request.
    
#### Server Side Techonology:  
    - Expressjs - Nodejs Framework.
    - MongoDB - No SQL Database.
    - Mongoose - Mongo DB Driver.
    - jsonwebtoken - Token based auth manage.
    - ExpressValidator - Serverside Data validation schema.
    - Bcrypt - Secure Password Hashing Packege.

## HTTP Errors:

| STATUS CODE | MESSAGES |
| ------ | ------ |
| 200 - OK | Everything worked as expected|
| 201 - Create | New data created|
| 400 - Bad Request | The request was unacceptable, often due to missing a required parameter. |
| 401 - Unauthorized | No valid API key provided. |
| 404 - Not Found | The requested resource doesn't exist. |
| 500 - Server Errors | Internal Server Error |

## Error Messages
> Note: This should be the errors type while backend data validation.

```sh
Request-Data / From-Data Error: 
{
    "errors": {
        "email": {
            "msg": "Email already used!",
        },
        "avatar": {
            "msg": "Invalid file format!",
        }
    }
}

Application Common Error like (400, 401, 500): 
{
    "errors": {
        "common": {
            "msg": "Internal Server Error!",
        }
    }
} 
```
