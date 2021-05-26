const errorMiddleware = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    statusCode: err.statusCode,
  };

  if (err.validationErrors) {
    errorDetails.validationErrors = err.validationErrors;
  }

  res.status(err.statusCode || 500);
  res.json({ error: errorDetails });
};

export { errorMiddleware as default };
