WITH result_header AS (
	SELECT
		a.id AS attempt_id,
		a.quiz_id,
		a.user_id,
		datetime,
		qz.title AS quiz_title
	FROM attempt a

	INNER JOIN quiz qz ON a.quiz_id = qz.id
	WHERE a.id = ${attempt_id}
), results AS (
	SELECT
		att.question_id,
		att.answer,
		ans.text AS correct_answer,
		CASE WHEN att.answer = ans.text THEN true
			 ELSE false
		 END AS result
	FROM attempt_answer att
	INNER JOIN answer ans ON ans.question_id = att.question_id
	WHERE att.attempt_id = ${attempt_id}
	AND ans.is_correct = true
), num_questions AS (
	SELECT
		count(*) AS num_questions
	FROM results
), score AS (
	SELECT
		count(*) AS score
	FROM results
	WHERE results.result = true
), agg AS (
	SELECT json_agg(results) AS results
	FROM (
		SELECT * FROM results
	) AS results
)

select * from result_header
CROSS JOIN agg
CROSS JOIN num_questions
CROSS JOIN score




