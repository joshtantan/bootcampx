SELECT cohorts.name AS cohort_name, COUNT(students.*) AS student_count
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
GROUP BY cohorts.name
HAVING COUNT(students.*) >= 18
ORDER BY student_count;
