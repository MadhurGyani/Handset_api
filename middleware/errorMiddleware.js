const errorMiddleware = (err, req, res, next) => {
    console.log('Error encountered in middleware......................................................................');

    // Default to 500 if status code isn't already set
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Set the response status code
    res.status(statusCode);

    // Send a JSON response with the error message and stack trace (if in development mode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : null
    });
}

module.exports = errorMiddleware;
// const errorMiddleware = (err, req, res, next) => {
//     console.log('here is an error middleware');
//     const statusCode = res.statusCode ? res.statusCode : 500;
//     res.status(statusCode);
//     res.json({ message: err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null });
// }
// module.exports = errorMiddleware