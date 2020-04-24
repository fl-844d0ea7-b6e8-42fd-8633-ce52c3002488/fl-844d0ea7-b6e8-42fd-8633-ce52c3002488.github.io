DELETE FROM flashcards_app.flashcards WHERE name like '%test%' or name like '%Test%' or name is null;
DELETE FROM flashcards_app.topics WHERE name like '%Test%' or name like '%Test%' or name is null;
ALTER SEQUENCE flashcards_app.topics_topic_id_seq RESTART WITH 1;
ALTER SEQUENCE flashcards_app.flashcards_id_seq RESTART WITH 1;
