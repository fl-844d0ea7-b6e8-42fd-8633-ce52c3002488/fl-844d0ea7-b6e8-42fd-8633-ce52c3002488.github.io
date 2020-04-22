ALTER SEQUENCE flashcards_app.topics_topic_id_seq RESTART WITH 1;
ALTER SEQUENCE flashcards_app.flashcards_id_seq RESTART WITH 1;

INSERT INTO flashcards_app.topics (name, colour) VALUES ('TestTopic', '#ff0');
INSERT INTO flashcards_app.topics (name, colour) VALUES ('Testing', '#f0f');
INSERT INTO flashcards_app.flashcards (topic_id, name, term, definition) VALUES (1, 'TestFlashcardName', 'TestFlashcardTerm', 'TestFlashcardDefinition');
INSERT INTO flashcards_app.flashcards (topic_id, name, term, definition) VALUES (2, 'TestingFlashcardName', 'TestingFlashcardTerm', 'TestingFlashcardDefinition');