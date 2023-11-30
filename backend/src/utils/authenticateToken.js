import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authorization = req.get("Authorization");
  let token = "";
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.split(" ")[1];
  }

  let decodedToken = {};

  try {
    decodedToken = jwt.verify(token, "APPnotasTEST2023");
  } catch (error) {
    console.error(error);
  }
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "Token no encontrado o invalido." });
  }

  const { id: userId } = decodedToken;

  req.userId = userId;

  next();
};

export default authenticateToken;
