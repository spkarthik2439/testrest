function log(req, res, next) {
  console.log("Logging....");
  next();
}

function authorization(req, res, next) {
  console.log("Authorizing....");
  next();
}

module.exports = {log, authorization};
