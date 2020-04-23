SELECT
	q.id,
	q.text, q.type,
	array_agg(a.text) AS answers
FROM question q
LEFT JOIN answer a ON a.question_id = q.id
WHERE quiz_id = ${quiz_id} AND a.text IS NOT NULL
GROUP BY q.id