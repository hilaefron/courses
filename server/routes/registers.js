const express = require('express');
const router = express.Router();
const db = require('../models/db');
const jwt = require('jsonwebtoken');

router.get("/:id", async (req, res) => {
    const sqlQuery=`SELECT course_name FROM registers where student_id=${req.params.id}`
    try{
      const result=await db.query(sqlQuery)
      res.send(result.rows);
    }
    catch(err){
      res.sendStatus(400)
    }
  });
router.get("/", async (req, res) => {
    const sqlQuery=`SELECT * FROM registers `
    try{
      const result=await db.query(sqlQuery)
      res.send(result.rows);
    }
    catch(err){
      res.sendStatus(400)
    }
  });
  
router.post('/', async (req, res) => {
    const {userId, subjectId, courseName} = req.body;
    const subjectNameQuery = `SELECT subject_name FROM subjects WHERE subject_id = ${subjectId}`
    const subjectNameResult= await db.query(subjectNameQuery)
    const subjectName=subjectNameResult.rows[0].subject_name
    console.log(subjectName)

    // check if the user is already registered for the course
    try{
      const check = await db.query(`SELECT * FROM registers WHERE student_id = ${userId} AND subject_id = ${subjectId}`);

      if(check.rows.length > 0) {
          res.status(409).send({ message: 'You have already registered for this course'});
          return;
      }

      const checkCourseCount_Query =
      `SELECT COUNT(course_name) FROM registers WHERE course_name LIKE $1`;
      const checkCourseCount_Values = [subjectName + "%"];
      const courseCount = await db.query(
      checkCourseCount_Query,
      checkCourseCount_Values
      
      );
      console.log(courseCount.rows[0].count)
    const ceil = Math.ceil((parseInt(courseCount.rows[0].count) + 1) / 22);
    const insertIntoTableQuery =`INSERT INTO registers (student_id, subject_id, course_name) VALUES ($1, $2, $3) RETURNING *`
    const insertValues=[userId, subjectId, `${subjectName}${ceil}`]
    const addCourse=await db.query(insertIntoTableQuery,insertValues)

    console.log(subjectName+ceil)
    console.log(addCourse)

    res.send(addCourse.rows)
    }
    catch(err){
      console.log(err)
    }
});

module.exports = router;
