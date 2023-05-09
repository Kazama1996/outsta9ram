const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: 201,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  console.log({
    status: err.statusCode,
    message: err.message,
  });
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, res);
};
