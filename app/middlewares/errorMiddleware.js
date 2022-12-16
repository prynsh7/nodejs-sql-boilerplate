const notFound = (req, res, next) => {
    const error = new Error('Not Found');
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    return res.status(statusCode).json({ message: err.message });
};

module.exports = { notFound, errorHandler };
