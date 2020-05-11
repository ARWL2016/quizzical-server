DROP TABLE IF EXISTS quiz;
CREATE TABLE quiz (
	quiz_id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	title VARCHAR(50)
);

ALTER TABLE quiz
    OWNER to qcpkzonkvskhfd;

DROP TABLE IF EXISTS question;
CREATE TABLE question (
	question_id SERIAL PRIMARY KEY,
	question_number INTEGER NOT NULL,
	quiz_id INTEGER NOT NULL,
	text VARCHAR(200)
);

ALTER TABLE question
    OWNER to qcpkzonkvskhfd;

DROP TABLE IF EXISTS option;
CREATE TABLE option (
	option_id SERIAL PRIMARY KEY,
	question_id INTEGER NOT NULL,
	text VARCHAR(50) NOT NULL,
	is_correct BOOLEAN DEFAULT false
);

ALTER TABLE option
    OWNER to qcpkzonkvskhfd;

DROP TABLE IF EXISTS attempt;
CREATE TABLE attempt (
	attempt_id SERIAL PRIMARY KEY,
	quiz_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE attempt
    OWNER to qcpkzonkvskhfd;

DROP TABLE IF EXISTS option_selected;
CREATE TABLE  option_selected (
	option_selected_id SERIAL PRIMARY KEY,
	attempt_id INTEGER NOT NULL,
	question_id INTEGER NOT NULL,
	option_id INTEGER NOT NULL,
	UNIQUE (attempt_id, question_id)
);

ALTER TABLE option_selected
    OWNER to qcpkzonkvskhfd;



