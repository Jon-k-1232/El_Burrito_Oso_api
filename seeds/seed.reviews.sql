INSERT INTO folders ("name")
VALUES
('Projects Folder'),
('Notes Folder'),
('Other Notes Folder');



INSERT INTO note ("name", content, folder_id)
VALUES
('Note One', 'this is note one', 1),
('Note Two', 'this is note two', 2),
('Note Three', 'this is note three', 3);

