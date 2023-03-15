const sendErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    status: 201,
    message: err.message,
    stack: err.stack,
  });
};

export const errorHandler = (err, req, res, next) => {
  console.log({
    status: err.statusCode,
    message: err.message,
  });
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  sendErrorDev(err, res);
};
