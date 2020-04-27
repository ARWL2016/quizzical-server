SELECT
	qst.question_id,
	qst.text,
	array_agg(opt.text) AS answers
FROM question qst
LEFT JOIN option opt ON opt.question_id = qst.question_id
WHERE quiz_id = ${quiz_id} AND opt.text IS NOT NULL
GROUP BY qst.question_id