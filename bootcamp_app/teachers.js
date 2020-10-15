const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort, COUNT(assistance_requests.*) AS total_assistances 
  FROM assistance_requests
  JOIN students ON student_id = students.id
  JOIN teachers ON teacher_id = teachers.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE '%${process.argv[2]}%'
  GROUP BY teachers.name, cohorts.name
  ORDER BY teachers.name;
  `)
  .then(res => {
    res.rows.forEach(report => {
      console.log(`${report.cohort}: ${report.teacher}`);
    })
  }).catch(err => console.error('query error', err.stack));