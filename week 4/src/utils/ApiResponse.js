//ApiResponse.js – Standard API Responses
/*
 Every response should follow a predictable structure. This helps frontend developers and third-party API consumers know what to expect 
*/

class ApiResponse{
    constructor(statusCode,data,message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400 
    }
}

export {ApiResponse}

//example use
//return res.status(200).json(new ApiResponse(200,userData,"User Fetched"));

/*
| Part                                             | Meaning                                                                                                                                               |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `res.status(200)`                                | Sets the HTTP response code to 200 (OK)                                                                                                               |
| `new ApiResponse(200, userData, "User Fetched")` | Creates a response object with: <br> - `statusCode`: 200 <br> - `data`: the user info from DB <br> - `message`: "User Fetched" <br> - `success`: true |
| `.json(...)`                                     | Sends the object as a JSON HTTP response                                                                                                              |

*/

/*
| Code                               | What It Does                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| `this.statusCode = statusCode;`    | Stores the HTTP status code (like 200, 404, etc.)                                  |
| `this.data = data;`                | Stores the actual response payload (e.g. user info, list of items)                 |
| `this.message = message;`          | Descriptive message (e.g., “User Fetched”)                                         |
| `this.success = statusCode < 400;` | Automatically sets `success` to `true` if the status is < 400 (i.e., not an error) |

*/



/*
Example Output (Frontend will receive):

{
  "statusCode": 200,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User Fetched",
  "success": true
}
*/