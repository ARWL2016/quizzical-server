WITH questions AS (
	SELECT
		qst.question_id,
		qst.question_number,
		qst.text
	FROM question qst
	WHERE quiz_id = ${quiz_id}

), options AS (
	SELECT
		question_id,
		json_object_agg(option_id, text) AS options
	FROM option WHERE option.question_id IN (SELECT question_id FROM question WHERE quiz_id = ${quiz_id})
	GROUP BY question_id
)

SELECT * FROM questions
NATURAL JOIN options
ORDER BY question_number;