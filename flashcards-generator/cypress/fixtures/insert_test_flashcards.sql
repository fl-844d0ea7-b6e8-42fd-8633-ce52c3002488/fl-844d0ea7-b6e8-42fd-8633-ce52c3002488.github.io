TRUNCATE TABLE flashcards_app.topics;
TRUNCATE TABLE flashcards_app.flashcards;

INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('DeleteMe', '#ff0', NOW(), NOW());
INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('TestTopic', '#ff0', NOW(), NOW());
INSERT INTO flashcards_app.topics (name, colour, created, updated) VALUES ('Testing', '#f0f', NOW(), NOW());

SELECT flashcards_app.topics.topic_id into TEMPORARY topic_ids from flashcards_app.topics LIMIT 2;

INSERT INTO flashcards_app.flashcards (name, term, definition) VALUES ('TestFlashcardName', 'TestFlashcardTerm', 'TestFlashcardDefinition');

INSERT INTO flashcards_app.flashcards (name, term, definition) VALUES ('TestingFlashcardName', 'TestingFlashcardTerm', 'TestingFlashcardDefinition');

UPDATE flashcards_app.flashcards SET topic_id = (select topic_id from topic_ids LIMIT 1) WHERE name = 'TestFlashcardName';
UPDATE flashcards_app.flashcards SET topic_id = (select topic_id from topic_ids OFFSET 1) WHERE name = 'TestingFlashcardName';