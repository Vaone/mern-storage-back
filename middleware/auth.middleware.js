const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({message: "Auth Error"})
    }
    req.user = jwt.verify(token, process.env.SECRET_KEY)
    next()
  } catch(e) {
    return res.status(401).json({message: "Auth error"})
  }
}