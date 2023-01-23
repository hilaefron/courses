const express = require("express");
const db=require('../models/db')
const router = express.Router();

router.get("/", async (req, res) => {
  const sqlQuery=`SELECT * FROM course`
  try{
    const result=await db.query(sqlQuery)
    res.send(result.rows);
  }
  catch(err){
    res.status(400).send(err.message)
  }
});

router.get("/:id", async (req, res) => {
  try{
    const sqlQuery=`SELECT *
    FROM course
    WHERE id=${req.params.id}`
    const result=await db.query(sqlQuery)
    res.send(result.rows[0]);
  }  
  catch(err){
    res.status(400).send(err.message)
  }  
});

router.post("/", async (req, res) => {
  try{
    const body=req.body
    const query=`INSERT INTO course (name, student_id, subject_id ) VALUES($1,$2,$3) RETURNING *`
    const values= [body.name, body.student_id, body.subject_id]
    const result=await db.query(query,values)
    res.send(result.rows[0])
  }
  catch(err){
    res.status(400).send(err)
  }
});

// router.put('/:id', async (req,res)=>{
//   const body=req.body
//   try{
//     const values=[body.title, body.body, body.iscompleted]
//     const sqlQuery=`UPDATE todo SET 
//     title = $1, 
//     body = $2, 
//     iscompleted = $3 
//     WHERE id=${req.params.id}
//     RETURNING *`

//     const result=await db.query(sqlQuery,values)
//     res.send(result.rows[0])
//     console.log('changed!')
//   }
//   catch(err){
//     res.status(400).send(err.message)
//     console.log(err.message)
//   }
//   res.send('good')


// })

router.delete('/',async(req,res)=>{
  const sqlQuery=`TRUNCATE TABLE course`
  await db.query(sqlQuery)
  res.send('deleted')
})

// router.delete("/:id", async (req, res) => {
//   try{
//     const sqlQuery=`DELETE FROM todo WHERE id=${req.params.id} RETURNING *`
//     const result=await db.query(sqlQuery)
//     res.send(`row ${req.params.id} deleted`)
//   }
//   catch(err){
//     res.status(400).send(err.message)
//     console.log(err.message)
//   }
//   res.send('done!')

// });

module.exports = router;
