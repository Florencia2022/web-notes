const errorHandler = async (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log(
    "\n<-------------------------------- Algo salió mal -------------------------------->\n"
  );
  console.error(message);
  res.status(status).send({ message });
  next();
};

export default errorHandler;
