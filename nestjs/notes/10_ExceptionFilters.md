
# Exception Filters (for practical implementation check http-exception.filter inside filters folder and exception.controller.ts)

- Handle Errors and exceptions in a centralized way. 
- Help in managing app-wide error handling logic cleanly and consistently.

### Where to use
- Filters can be applied at method-level, controller-level , or gloablly (in main.ts)
- @Catch() decorator is used to define which exception the filter will handle

### generating custom filter using command **nest g filter filters/http-exception**

