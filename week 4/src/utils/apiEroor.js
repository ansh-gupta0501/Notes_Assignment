// ApiError :- Custom Error Handling

/*
We need consistent , sturctured error responses - not just random strings. this file helps by giving us a reusable way to throw errors that:-
- include status codes 
- return a standard error format 
- carry extra error data 
*/

class ApiError extends Error{
    constructor(statusCode,message = "Something Went Wrong",errors = [],stack = ""){
        super(message) // call build-in Error constructor
        this.statusCode = statusCode  //e.g. 400,404,500
        this.data = null 
        this.message = message
        this.success = false 
        this.errors = errors
        
        /*
        Sets custom fields that are useful when sending API responses.
        data is null because there is no data in an error.
        success is false by definition.
        */

        //set custom stack tree or generate one 

        /*
        stack is like the "traceback" — it helps developers debug where the error occurred.
        If a custom stack is given, use it.
        Otherwise, generate it automatically.
        */

        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}


//example use:
throw new ApiError(404,"User not found");

/*
What this line does:
Creates a new ApiError instance with:

statusCode: 404 (Not Found)

message: "User not found"

errors: default empty array

stack: auto-generated

Throws it, meaning the function execution stops and the error bubbles up to the next try-catch or Express middleware.
*/

/* 
| Parameter    | Type   | Purpose                                                        |
| ------------ | ------ | -------------------------------------------------------------- |
| `statusCode` | Number | HTTP status (e.g. `404`, `500`, etc.)                          |
| `message`    | String | Error message (optional, defaults to `"Something Went Wrong"`) |
| `errors`     | Array  | Additional data (e.g., validation errors)                      |
| `stack`      | String | Optional stack trace (used mainly for debugging)               |

*/



/*
    How It’s Typically Used in Express

app.get('/user/:id', asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json(new ApiResponse(200, user, "User retrieved"));
}));

Then in your centralized error handler:


app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    } else {
        // generic fallback
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
});
*/