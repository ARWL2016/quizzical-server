-- SELECT
-- 	qst.question_id,
-- 	qst.question_number,
-- 	qst.text,
-- 	array_agg(opt.text) AS answers
-- FROM question qst
-- LEFT JOIN option opt ON opt.question_id = qst.question_id
-- WHERE quiz_id = ${quiz_id} AND opt.text IS NOT NULL
-- GROUP BY qst.question_id

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
	FROM option WHERE option.question_id IN (SELECT question_id FROM question WHERE quiz_id = 2)
	GROUP BY question_id
)

SELECT * FROM questions
NATURAL JOIN options;