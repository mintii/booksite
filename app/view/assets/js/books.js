//////////////////////////////////////////////////////////////////////////////////////////
// PAGE LOGIC AND FORM CONTROL ///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

$(".header-login").on("click", function(event) {
  event.preventDefault();
  alert("hi");
});

/**
 * On page load, query the databases and create cards for each book
 */
$(document).ready(() => {
  console.log("ready!");

// This kind of method should go into your controller
  $.get("/api/allbooks", data => {
    console.log(data);
    data.map(item => {
      createNewCard(item);
    });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS //////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

/**
 * This creates the HTML for each book card.
 * @param {object} item - each item consists of data from the API call for a single book.
 */
function createNewCard(item) {
  let newBookCard = $("<div>");
  newBookCard.addClass("bookcard");
  newBookCard.attr("value", item.bookID);

  const temp = item.dateUpdated + " ";

  const year = temp.substring(0, 4);
  const month = temp.substring(5, 7);
  const day = temp.substring(8, 10);

  console.log(year, month, day);

  // component creation ///////////////////////////////////////////////
  // create header
  let newBookHeader = $("<div>");
  newBookHeader.addClass("bookcard-header");

  // create title
  let newBookTitle = $("<div>");
  newBookTitle.addClass("bookcard-title");
  newBookTitle.html(
    `<a href="./bookdetails/${item.bookID}"><h2>${item.title}</h2></a>`
  );

  // create author info
  let newBookInfo = $("<div>");
  newBookInfo.addClass("bookcard-info");
  newBookInfo.html(`<h3>${item.name}</h3>`);

  // create text info
  let newBookText = $("<div>");
  newBookText.addClass("bookcard-text");
  newBookText.html(`<p>${item.review}</p>`);

  // create footer info
  let newBookFooter = $("<div>");
  newBookFooter.addClass("bookcard-footer");
  newBookFooter.html(`<p>pages read: ${item.pagesRead} out of ${item.pages}</p>
  <p>Status: ${item.bookstatus}</p>
  <p>Date updated: ${year}/${month}/${day}</p>
  <p>current rating: ${item.rating}/5</p>`);

  // card creation ///////////////////////////////////////////////
  newBookHeader.append(newBookTitle);
  newBookHeader.append(newBookInfo);
  newBookCard.append(newBookHeader);
  newBookCard.append(newBookText);
  newBookCard.append(newBookFooter);

  /*
  Cool approch to dynamically generating your pages! This really feels like React,
  but you're not using React! If this is something you're edging towards learning,
  I think you're ready to try :)
  A lot of this could go into the controller. Perhaps in the form of a method.

  REQUEST GET /books
  Controller receives this request. It asks Model the necessary queries to gather
  all the book info. Controller sends to the view the necessary data to load the books view.
    A lot of this can be super opinionated, but at the heart of it, you want to strive
    for an object-oriented application.
    Resources:
    http://timstermatic.github.io/blog/2013/08/17/a-simple-mvc-framework-with-node-and-express/
    https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS
    https://www.poodr.com/ (written about Ruby, but still very helpful Often free online)

*/


  // append card to the main content section
  $(".main-content").append(newBookCard);
}
