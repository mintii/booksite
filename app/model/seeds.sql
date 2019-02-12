-- for testing the setup of this app

INSERT INTO authors (name,keywords)
VALUES
("ruth ozeki",""),
("jeff vandermeer","");

 INSERT INTO books (title,authorID) 
VALUES
("a tale for the time being",1),
("annihilation",2)
;

-- status options: 
-- to read / reading / finished / dnf

INSERT INTO progress(pages,bookstatus,pagesRead,bookId)
VALUES
(500,"finished",230,1),
(150,"finished",121,2)
;

INSERT INTO ratings(rating,review,bookId)
VALUES
(5,"I really loved this -- both the perspective of the girl and the responses from the woman. I rarely enjoy when authors put themselves into their books, but this was an exception.",1),
(5,"Spooky and upsetting and lots of body horror. I like the whole series, but I think this is the strongest book.",2)
;


select * from books;