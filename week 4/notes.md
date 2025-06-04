# CLIENT - SERVER ARCHITECTURE

- there are two machines client machine and server machine , client makes request to server (say . www.google.com) , server send a response for this request to the client

### How client machine knows where to send request 
- As there are mulitple servers machine on the internet , how this particular client machine knows where to send this request?
- So the request(www.google.com) was first passed to DNR(Domain Name Resolution) and then this request was converted to a address (xx.xx.xx) and this address is of that specific server machine.
- Now server process the request and send the response to client.


### JWT
- JWT is bearer token which means whoever will the give this token , i will give him data 

### HTTP
- Hyper Text Transfer Protocol - used to transfer text over the internet 
- URL , URI , URN => LOCATION , IDENTIFIER , NAME . 
- in Location, it is not compulsory the url is http like in mongodb we have srn & srv type of protocol for communication . HTTP IS one of them . So we sometimes use URI to get uniquely identifier for that protocol 

### headers
- whenever we send http request , then we have to send some information along with that called metadata . These are http headers which are key value pair
- there are some prebuilt headers but we can make our own headers
- headers are found in both req and res

- headers do many works like caching, authentication,manage state(guest user, login user)


- Request Headers - from client
- response headers - from server (need standarisation)
- representation headers - encoding/compression
- payload headres - data 

### most common header 

- accept : application/json // it tellw which type of data to accepted in server
- user : agent          // it tells from where request comes , browser or postman 
- authorization      // 
- content-type // sending images , pdf 
- cookie // key - value pair 
- cache-control  

### CORS headers

- Access-Control-Allow = Origin
- Access- Control-Allow = Credentials
- Access-control-allow = method

### Securty

- Cross-Origin-Embedder-Policy
- Cross-Origin-Openes-Policy
- Content - Security - Policy
- X-XSS- protection

### HTTP methods
- Basic set of operations that can be used to interact with server
- Get : retrieve a resource
- Head : No message body (response headers only)
- OPTIONS : What operations are available
- Trace : loopback test(Get some data)
- Delete : remove a resourse
- Put : replace a resourse
- Post : interarct with resource (mostly add)
- patch : change part of a resource

### HTTP Status code 
- 1xx Informational // just passing information to user
- 2xx success  //operation successfully completed
- 3xx  redirection // 
- 4xx client error
- 5xx server error

- 100 Continue
- 102 Processing
- 200 OK
- 201 CREATED
- 202 accepted
- 307 temporary redirect
- 308 permanet redirect
- 400 Bad request
- 401 Unauthorized
- 402 - Payment required
- 404 - not found
- 500 - internal server error
- 504 - Gateway timeout 

### ACCESS_TOKEN
- It will not stored on database 

### Refresh_token
- store in database

