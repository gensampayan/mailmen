import jwt from "jsonwebtoken";

const createToken = (user) => {
  const data = { userId: user._id };
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1hr" });
  return token;
}

const verifyToken = (req, res, next) => {
  try {
    if (req.body.headers !== undefined) {
      const token = req.body.headers.split(" ")[1];
      return jwt.verify(token, process.env.JWT_SECRET);
      next()
    } else {
      res.status(401).send({
        message: "missing token"
      })
    }
  } catch(error) {
    console.error(error);
    res.status(403).send(error.message);
  }
}

export { createToken, verifyToken };
