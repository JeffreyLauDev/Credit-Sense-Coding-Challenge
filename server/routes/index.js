
module.exports = app => {
  require("./users")(app);
  require("./transactions")(app);

};
