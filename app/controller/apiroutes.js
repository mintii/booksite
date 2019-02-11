var connection = require("./connection.js");

module.exports = function(app) {
  /**
   * Selects a single author from the existing author database. This is called as part of generating a new
   * book - if an author already exists in the database, use that authorID instead of creating a new author.
   */
  app.post("/api/author", function(req, res) {
    console.log(req.body);
    connection.query(
      `SELECT * FROM authors WHERE UPPER(name) = "${req.body.name}";`,
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });

  /**
   * Query to select ALL BOOKS that exist. Used in the /books page to generate the full list of books and
   * cards for each book.
   */
  app.get("/api/allbooks", function(req, res) {
    connection.query(
      "SELECT * FROM books LEFT JOIN progress ON books.id = progress.bookID LEFT JOIN ratings ON books.id = ratings.bookID LEFT JOIN authors ON books.authorID = authors.ID;",
      function(err, data) {
        if (err) throw err;
        // console.log(data);
        res.json(data);
      }
    );
  });

  /**
   * Query to select a single book for the book details page
   */
  app.get("/api/onebook/:id", function(req, res) {
    console.log(req.params);
    connection.query(
      `SELECT * FROM books LEFT JOIN progress ON books.id = progress.bookID LEFT JOIN ratings ON books.id = ratings.bookID LEFT JOIN authors ON books.authorID = authors.ID WHERE books.id = ${
        req.params.id
      };`,
      function(err, data) {
        if (err) throw err;
        // console.log(data);
        res.json(data);
      }
    );
  });

  /**
   * Query used in the book update form. This updates whatever exists in the current table with
   * user-input information.
   */
  app.post("/api/onebook", function(req, res) {
    console.log("req body", req.body);

    connection.query(
      `UPDATE books, authors, progress, ratings SET authors.name = "${
        req.body.name
      }", books.title = "${req.body.title}", progress.pages = ${
        req.body.pages
      }, progress.pagesRead = ${req.body.pagesRead}, ratings.rating = ${
        req.body.rating
      }, ratings.review = "${
        req.body.review
      }" WHERE books.id = progress.bookID AND books.id = ratings.bookID AND books.authorID = authors.ID AND books.id = ${
        req.body.id
      };`,
      function(err, data) {
        if (err) throw err;
        // console.log(data);
        res.json(data);
      }
    );
  });

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // NEW ITEMS /////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * New Author added to database. This will return the new ID of the created row.
   */
  app.post("/api/newauthor", function(req, res) {
    console.log(req.body);
    connection.query(
      `INSERT INTO authors (name,keywords) VALUES ("${req.body.name}","");`,
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });

  /**
   * New book added to database. This will return the new ID of the created book, which gets fed into
   * other create item queries.
   */
  app.post("/api/newbook", function(req, res) {
    console.log(req.body);
    connection.query(
      `INSERT INTO books (title,authorID) VALUES("${req.body.title}",${
        req.body.authorId
      });`,
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });

  /**
   * Creates a new ratings entry for the book in question
   */
  app.post("/api/newbook_rating", function(req, res) {
    console.log(req.body);
    connection.query(
      `INSERT INTO ratings (rating,review,bookId) VALUES (${req.body.rating},"${
        req.body.review
      }",${req.body.bookId});`,
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });

  /**
   * Creates a new progress entry for the book in question
   */
  app.post("/api/newbook_progress", function(req, res) {
    console.log(req.body);
    connection.query(
      `INSERT INTO progress (pages,bookstatus,pagesRead,bookId) VALUES (${
        req.body.pages
      },"${req.body.bookstatus}",${req.body.pagesRead},${req.body.bookId});`,
      function(err, data) {
        if (err) throw err;
        res.json(data);
      }
    );
  });
};
