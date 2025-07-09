const { getUser } = require("../service/auth");

function checkAuthentication(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  req.user = null;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer"))
    return next();
  const token = authorizationHeader.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.json({ status: "please login first" });
    if (!roles.includes(req.user.role))
      return res.json({ status: "UnAuthorized" });
    return next();
  };
}

module.exports = { checkAuthentication, restrictTo };
