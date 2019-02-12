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

-- So I'd recommend this and the schema.sql file get added as a command in package.json in the scripts section.
-- Model is typically the programming logic that relates to the interactions with your database.
-- Authors table -> Author class
-- Books table -> Book class
-- All saved in model file. Make a separate file for these sql files called migrations
