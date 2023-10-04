# Broken App Issues

## Inconsistent variable declarations

Some variables were declared with `let` and `const` while others were declared with `var`. After ES2016, it generally best to stick to `let` and `const` as opposed to `var`. 

## Missing next Parameter in the Catch Block

In the try...catch block, there was a catch block without a next parameter. `Catch (err)` was needed instead of just `catch`. The `next` parameter is used to pass errors to the error handling middleware.

## Attempting to Map Over Promises

The previous code was attempting to map over the req.body.developers array and make asynchronous requests using Axios. However, because Axios returns promises when making asynchronous requests, trying to map over them directly results in mapping over promises not data. As a result, the code was corrected to utilize Promise.all to await all the promises and then send the response once all requests are complete. 

Original Code:
```
let results = req.body.developers.map(async d => {
  return await axios.get(`https://api.github.com/users/${d}`);
});
```

Corrected Code:
```
let results = await Promise.all(req.body.developers.map(async (d) => {
  return await axios.get(`https://api.github.com/users/${d}`);
}));
```

## No Error Handling

The previous code did not include any error handlers above `app.listen`. It tried to use a generic `try...catch` block to catch errors and pass them to the `next()` function. However, it didn't define any middleware to handle these errors. As a result, an ExpressError custom error class was created to handle errors. Two error-handling middleware functions were also added: one to handle 404 errors (Not Found), and another to handle general errors and respond with JSON error messages, including the error status and message.

## Port Binding

Originally, the application started listening on port 3000 immediately after defining the routes and middleware. As a result, no testing could be added. The application was changed to be exported and started via a server.js file so that testing could be added if needed.

## Variable Naming

Some variable names were changed to better represent their meaning, such as 'out' changed to 'output'.
