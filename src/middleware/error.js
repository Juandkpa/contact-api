const developmentErrors = (err, req, res, next) => {
  const errorDetails = {
    message: err.message,
    statusCode: err.statusCode,
    stack: err.stack || '',
  };
  if (err.validationErrors) {
    errorDetails.validationErrors = err.validationErrors;
  }

  res.status(err.statusCode || 500);
  res.json({ error: errorDetails });
};

const productionErrors = (err, req, res, next) => {
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

export { productionErrors, developmentErrors };
