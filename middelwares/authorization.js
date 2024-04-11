const jwt = require("jsonwebtoken");
const JWT_EXPIRY = process.env.JWT_EXPIRY;
const JWT_SECRET_CODE = process.env.JWT_SECRET;

const jwtEncode = (id, role) => {
  return jwt.sign({ id: id, role: role }, JWT_SECRET_CODE, {
    expiresIn: JWT_EXPIRY,
  });
};

const jwtDecode = (token) => {
  return jwt.verify(token, JWT_SECRET_CODE);
};

module.exports = {
  jwtEncode,
  jwtDecode,
};
