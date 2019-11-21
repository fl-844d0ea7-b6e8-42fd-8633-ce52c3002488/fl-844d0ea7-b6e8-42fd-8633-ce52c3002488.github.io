DELETE FROM flashcards_app.flashcards WHERE name like '%test%';
DELETE FROM flashcards_app.topics WHERE name like '%Test%';
ALTER SEQUENCE topics_topic_id_seq RESTART WITH 1;
ALTER SEQUENCE flashcards_id_seq RESTART WITH 1;
