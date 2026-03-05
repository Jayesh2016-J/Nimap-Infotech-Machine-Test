exports.globalerror = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err?.error?.details) {
        err.message = err.error.details[0].message;
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};