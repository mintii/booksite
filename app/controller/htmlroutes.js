const path = require("path");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/../view/html/index.html"));
  });

  app.get("/books", function(req, res) {
    debugger
    res.sendFile(path.join(__dirname, "/../view/html/books.html"));
  });
  /*
  Great set up of controller request/responses!
  I think here it is also important to do your model queries, instead of in the
  view/assets/js files.
  */
  app.get("/bookdetails/:id", function(req, res) {
    res.sendFile(path.join(__dirname, "/../view/html/bookdetails.html"));
  });

  app.get("/newbook", function(req, res) {
    res.sendFile(path.join(__dirname, "/../view/html/newbook.html"));
  });
};

/*
When you start to think about creating users. Think about how these routes could be reorganized
What can a user see when logged in vs not?
The req for these methods may then have an importance to check.
 */
