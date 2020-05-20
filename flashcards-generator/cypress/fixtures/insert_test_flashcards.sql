TRUNCATE TABLE flashcards_app.topics;
TRUNCATE TABLE flashcards_app.flashcards;

ALTER SEQUENCE flashcards_app.topics_topic_id_seq RESTART WITH 1;
ALTER SEQUENCE flashcards_app.flashcards_id_seq RESTART WITH 1;

INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('DeleteMe', '#ff0', NOW(), NOW());
INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('TestTopic', '#ff0', NOW(), NOW());
INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('Testing', '#f0f', NOW(), NOW());

INSERT INTO flashcards_app.flashcards (topic_id, name, term, definition) VALUES (2, 'TestFlashcardName', 'TestFlashcardTerm', 'TestFlashcardDefinition');
INSERT INTO flashcards_app.flashcards (topic_id, name, term, definition) VALUES (3, 'TestingFlashcardName', 'TestingFlashcardTerm', 'TestingFlashcardDefinition');