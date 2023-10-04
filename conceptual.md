# Conceptual Exercise

### What are some ways of managing asynchronous code in JavaScript?

-  Callbacks: Callbacks are functions that are passed as arguments to other functions and are executed when an asynchronous operation is complete
-  Promises: Promises are one-time guarantees of a future value. They can be in any of three states: pending, resolved, and rejected. Chaining a method to the end of the promise allows the promise to either resolve or reject, and the corresponding value to be obtained.
-  Async/await: Async/await is built on top of Promises and provides a more readable way to work with asynchronous code. Async functions always return promises.

### What is a Promise? 

Promises are one-time guarantees of a future value. They consist of three states: pending, resolved, and rejected. Upon resolution or rejection, they return a resolved or rejected value.

### What are the differences between an async function and a regular function?

- Return Values:
	- An async function always returns a Promise, even if there is no explicit return statement. The resolved value of the Promise is whatever is returned from the async function. A regular function can return a value directly. 
- Asynchronicity:
	- Async functions can contain the await keyword, which allows them to pause their execution until an awaited Promise is resolved. Regular functions don't have this capability. They execute code sequentially and block the event loop if they perform time-consuming operations. 
- Error Handling:
	- Errors in Promises can also be handled using try/catch blocks or .catch(). Regular Functions can only handle errors using try/catch blocks or more complicated techniques.

### What is the difference between Node.js and Express.js?

Node.js is a runtime environment for executing JavaScript on the server-side. It provides the core infrastructure to handle input/output operations and network communication. Express.js, on the other hand, is a web application framework built on top of Node.js. It offers a higher-level structure for building web applications and simplifying tasks including routing, middleware, and HTTP requests/responses.

### What is the error-first callback pattern?

Node.js callbacks usually conform to an error-first callback pattern. This is where the callback function’s first parameter is the error, and Node will supply an error object if one occured, or null. The other parameters follow afterward if there are any.

### What is middleware?

Middleware is code that runs in the middle of the request / response cycle. In Express, middleware are functions that get access to the req and res objects and can also call the "next" function.

Custom 404 and global error handlers and functions to check for and parse certain formats are common examples of middleware.

### What does the `next` function do?

The next function is a parameter that can be included in a middleware function, and when called within that function, it instructs Express.js to pass control to the next middleware function in the chain. If "next" is not included, the "next" route will not be met. If an argument is passed to "next", Express always treats this as an error.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
### What are some issues with the above code? (consider all aspects: performance, structure, naming, etc)

- Performance: The code makes three separate HTTP requests sequentially, which means that each request will have to wait for the previous one to return before it can begin. If one request takes a long time to complete, it will delay the entire operation.

- Error Handling: The code lacks error handling. If any of the requests fail, the code does not handle any of these errors. As a result, if one of those requests experiences a network or API error, nothing is returned.

	