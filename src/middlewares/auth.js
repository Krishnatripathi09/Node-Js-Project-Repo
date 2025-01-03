//Handle Auth MiddleWare for all GET,POST,....Requests
const adminAuth = (req, res, next) => {
  console.log("Admin Auth Middleware is Getting Checked");

  const token = "xyz";
  const isAuthoRized = token === "xyz";
  if (!isAuthoRized) {
    res.status(401).send("Chal Nikal ......");
  } else {
    next();
  }
};

module.exports = { adminAuth };
