const express = require("express");
const db=require('../models/db')
const router = express.Router();

router.get("/", async (req, res) => {
  const sqlQuery=`SELECT * FROM subjects`
  try{
    const result=await db.query(sqlQuery)
    res.send(result.rows);
  }
  catch(err){
    res.sendStatus(400)
  }
});

router.post("/", async (req, res) => {
    try{
      const body=req.body
      const query=`INSERT INTO subjects (subject_name, rating, level, description ) VALUES($1,$2,$3,$4) RETURNING *`
      const values= [body.subject_name, body.rating, body.level, body.description]
      const result=await db.query(query,values)
      res.send(result.rows[0])
    }
    catch(err){
        res.status(400).send(err)
    }
  });

 router.put('/:id', async (req,res)=>{
    const body=req.body
    try{
      const values= [body.subject_name, body.rating, body.level, body.description]
      const sqlQuery=`UPDATE subjects SET 
      subject_name = $1, 
      rating = $2, 
      level = $3 
      description = $4
      WHERE subject_id=${req.params.id}
      RETURNING *`
  
      const result=await db.query(sqlQuery,values)
      res.send(result.rows[0])
      console.log('changed!')
    }
    catch(err){
      res.status(400).send(err.message)
      console.log(err.message)
    }
    res.send('good')
  
  
  })

router.delete('/',async(req,res)=>{
  const sqlQuery=`TRUNCATE TABLE subjects`
  await db.query(sqlQuery)
  res.send('deleted')
})

router.delete("/:id", async (req, res) => {
  try{
    const sqlQuery=`DELETE FROM subjects WHERE subject_id=${req.params.id} RETURNING *`
    const result=await db.query(sqlQuery)
    res.send(`row ${req.params.id} deleted`)
  }
  catch(err){
    res.status(400).send(err.message)
    console.log(err.message)
  }
  res.send('done!')

});
  
  
module.exports = router;
