DELETE FROM quiz;
DELETE FROM question;


INSERT INTO quiz(user_id, title)
VALUES (0, 'Countries and Capitals');


INSERT INTO question(question_number, quiz_id, text)
VALUES 
	(1, (SELECT quiz_id FROM quiz WHERE title = 'Countries and Capitals'), 'What is the capital of France?'),
	(2, (SELECT quiz_id FROM quiz WHERE title = 'Countries and Capitals'), 'What is the capital of Germany?'),
	(3, (SELECT quiz_id FROM quiz WHERE title = 'Countries and Capitals'), 'What is the capital of Italy?');
	
	
INSERT INTO option(question_id, text, is_correct)
VALUES 
	((SELECT question_id FROM question WHERE text = 'What is the capital of France?'), 'Paris', true),
	((SELECT question_id FROM question WHERE text = 'What is the capital of France?'), 'Lyon', false),
	((SELECT question_id FROM question WHERE text = 'What is the capital of Germany?'), 'Bonn', false),
	((SELECT question_id FROM question WHERE text = 'What is the capital of Germany?'), 'Berlin', true),
	((SELECT question_id FROM question WHERE text = 'What is the capital of Italy?'), 'Rome', true),
	((SELECT question_id FROM question WHERE text = 'What is the capital of Italy?'), 'Florence', false);


SELECT * FROM quiz 
INNER JOIN question ON quiz.quiz_id = question.quiz_id
LEFT JOIN option ON option.question_id = question.question_id
