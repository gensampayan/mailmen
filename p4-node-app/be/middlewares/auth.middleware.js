import jwt from "jsonwebtoken";

const createToken = (user) => {
  const data = { userId: user._id };
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
}

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Missing token" });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({ message: "Token verification failed" });
  }
}

export { createToken, verifyToken };
