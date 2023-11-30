const successHandler = async (res, status, json) => {
  console.log(
    "\n<------------------------- Consulta realizada con Éxito ------------------------->\n"
  );
  res.status(status).json(json);
};

export default successHandler;
