WITH result_header AS (
	SELECT
		att.attempt_id,
		att.quiz_id,
		att.user_id,
		created_at,
		qz.title AS quiz_title
	FROM attempt att

	INNER JOIN quiz qz ON att.quiz_id = qz.quiz_id
	WHERE att.attempt_id = ${attempt_id}
), results AS (

	SELECT
		os.question_id,
		qs.text,
		opt1.text AS option_selected,
		opt2.text AS correct_option,
		CASE WHEN opt1.text = opt2.text THEN true
			 ELSE false
		 END AS result
	FROM option_selected os
	INNER JOIN option opt1 ON opt1.option_id = os.option_id
	INNER JOIN option opt2 ON opt2.question_id = os.question_id
 	INNER JOIN question qs ON qs.question_id = os.question_id

	WHERE os.attempt_id = ${attempt_id}
	AND opt2.is_correct = true

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




