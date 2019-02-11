//////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Create an object from information that is entered in the new book form. This
 * gets passed to the database via API calls.
 */
const getBookInfo = () => {
  return {
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
};

/**
 * This takes the author ID provided by API query and creates a new book, a new book rating, and a new book progress.
 * @param {object} newInfo - includes the author ID that needs to be appended to each book object
 */
const createBookInfo = newInfo => {
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
};

//////////////////////////////////////////////////////////////////////////////////////////
// PAGE LOGIC AND FORM CONTROL ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Gets the information entered in the update form and
 * creates the object sent into the database
 */
$("#new-form").submit(event => {
  event.preventDefault();
  const newInfo = getBookInfo();
  console.log(newInfo);

  // step 0: check to see if author exists
  $.post("/api/author", newInfo, function(data) {
    // if author doesn't exist, add author
    if (data.length === 0) {
      $.post("/api/newauthor", newInfo, data => {
        newInfo.authorId = data.insertId;
        console.log(newInfo);
        createBookInfo(newInfo);
      });
    }
    // if author does exist, author ID gets set to existing author
    else {
      newInfo.authorId = data[0].id;
      createBookInfo(newInfo);
    }
  });
});
