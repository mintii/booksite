/**
 * Gets the information entered in the update form and
 * creates the object sent into the database
 */
$("#new-form").submit(event => {
  event.preventDefault();
  const newInfo = {
    title: $("#new-title")
      .val()
      .trim(),
    name: $("#new-author")
      .val()
      .trim(),
    bookstatus: $("#new-status").val(),
    rating: $("#new-rating").val(),
    review: $("#new-review")
      .val()
      .trim(),
    pagesRead: $("#new-pages-read").val(),
    pages: $("#new-pages").val()
  };
  console.log(newInfo);

  // step 0: check to see if author exists
  $.post("/api/author", newInfo, function(data) {
    if (data.length === 0) {
      $.post("/api/newauthor", newInfo, data => {
        newInfo.authorId = data.insertId;
        console.log(newInfo);
        $.post("/api/newbook", newInfo, data => {
          console.log(data);
          newInfo.bookId = data.insertId;
          $.post("/api/newbook_rating", newInfo, data => {
            console.log(data);
          });
          $.post("/api/newbook_progress", newInfo, data => {
            console.log(data);
          });
        });
      });
    } else {
      newInfo.authorId = data[0].id;
      $.post("/api/newbook", newInfo, data => {
        console.log(data);
        newInfo.bookId = data.insertId;
        $.post("/api/newbook_rating", newInfo, data => {
          console.log(data);
        });
        $.post("/api/newbook_progress", newInfo, data => {
          console.log(data);
        });
      });
    }
  });
  //

  // $.post("/api/newauthor", newInfo, data => {
  //   newInfo.authorId = data.insertId;
  //   console.log(newInfo);
  //   $.post("/api/newbook", newInfo, data => {
  //     console.log(data);
  //     newInfo.bookId = data.insertId;
  //     $.post("/api/newbook_rating", newInfo, data => {
  //       console.log(data);
  //     });
  //     $.post("/api/newbook_progress", newInfo, data => {
  //       console.log(data);
  //     });
  //   });
  // });
});

// how to do this:

// 4 different API calls to hit each of the 4 tables
// when returning data, we get insertId sent back

// 1. update the author table first. using the insertId sent back...
// 2. update the book table, using the insertId from the author table. Using the new book insertId...
// 3. update the ratings and the progress tables, hooking them to the book table via insertId
