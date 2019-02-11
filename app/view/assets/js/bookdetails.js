//////////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS /////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * Create the bookID - this determines everything about the actual book being pulled in/edited.
 */
const bookID = window.location.pathname.substring(13);

//////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * this function updates each of the appropriate areas
 * of the details page. Called as part of page load.
 * @param {object} book
 */
const enterBookDetails = book => {
  $("#jq-detail-title").html(book.title);
  $("#jq-detail-author").html(book.name);
  $("#jq-detail-status").html(book.bookstatus);
  $("#jq-detail-rating").html(book.rating);
  $("#jq-detail-review").html(book.review);
  $("#jq-detail-pages-read").html(book.pagesRead);
  $("#jq-detail-pages").html(book.pages);
  $("#jq-detail-update-date").html(book.dateUpdated);
};

/**
 * This grabs information put into the update form and returns an object
 */
const getFormInfo = () => {
  return {
    title: $("#update-title")
      .val()
      .trim(),
    name: $("#update-author")
      .val()
      .trim(),
    bookstatus: $("#update-status").val(),
    rating: $("#update-rating").val(),
    review: $("#update-review")
      .val()
      .trim(),
    pagesRead: $("#update-pages-read").val(),
    pages: $("#update-pages").val(),
    id: bookID
  };
};

/**
 * This sets the fields in the input form to blanks or placeholders
 */
const setPlaceholders = () => {
  $("#update-title").val("");
  $("#update-author").val("");
  $("#update-status").val("to read");
  $("#update-rating").val("5");
  $("#update-review").val("");
  $("#update-pages").val(100);
  $("#update-pages-read").val(0);
  window.location.reload();
};

//////////////////////////////////////////////////////////////////////////////////////////
// PAGE LOGIC AND FORM CONTROL ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * On page load, query the databases and fill in all information
 */
$(document).ready(() => {
  console.log("ready!");
  console.log(bookID);

  $.get(`/api/onebook/${bookID}`, data => {
    enterBookDetails(data[0]);
  });
});

/**
 * Gets the information entered in the update form and
 * creates the object sent into the database
 */
$("#update-form").submit(event => {
  event.preventDefault();
  const updateInfo = getFormInfo();

  console.log(updateInfo);
  $.post("/api/onebook", updateInfo, data => {
    console.log("hi");
    console.log(data);
    if (data.changedRows >= 1) {
      setPlaceholders();
    }
  });
});

/**
 * Hides/unhides the update section and preloads
 * all the information
 */
$("#test-button").on("click", () => {
  if ($(".detail-update").css("display") === "none") {
    $(".detail-update").css("display", "block");

    console.log("Hello");
    $("#update-title").val($("#jq-detail-title")[0].textContent);
    $("#update-author").val($("#jq-detail-author")[0].textContent);
    $("#update-status").val($("#jq-detail-status")[0].textContent);
    $("#update-rating").val($("#jq-detail-rating")[0].textContent);
    $("#update-review").val($("#jq-detail-review")[0].textContent);
    $("#update-pages").val($("#jq-detail-pages")[0].textContent);
    $("#update-pages-read").val($("#jq-detail-pages-read")[0].textContent);
  } else {
    $(".detail-update").css("display", "none");
  }
});
