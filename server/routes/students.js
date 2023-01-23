const express = require("express");
const db=require('../models/db')
const router = express.Router();
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken");




router.get("/", async (req, res) => {
  const sqlQuery=`SELECT * FROM students`
  try{
    const result=await db.query(sqlQuery)
    res.send(result.rows);
  }
  catch(err){
    res.sendStatus(400)
  }
});

router.get("/:id", async (req, res) => {
  const sqlQuery=`SELECT * FROM students WHERE id=${req.params.id}`
  try{
    const result=await db.query(sqlQuery)
    res.send(result.rows[0]);
  }
  catch(err){
    res.sendStatus(400)
  }
});

  
router.post("/", async (req, res) => {
    const body = req.body;
    try {
        // Check if email already exists in the students table
        const emailExistsQuery = `SELECT * FROM students WHERE email = $1`;
        const emailExistsValues = [body.email];
        const emailExistsResult = await db.query(emailExistsQuery, emailExistsValues);
        if (emailExistsResult.rowCount > 0) {
            // Email already exists, return error message
            res.status(400).send({ error: "This user already exists." });
        } else {
            // Email does not exist, insert new student and hash password
            const saltRounds = 10;
            const plainPassword = body.password;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(plainPassword, salt, async function (err, hash) {
                    // Insert new student with hashed password
                    const insertQuery = `INSERT INTO students (name, email, password) VALUES($1,$2,$3) RETURNING *`;
                    const insertValues = [body.name, body.email, hash];
                    const insertResult = await db.query(insertQuery, insertValues);
                    // create token for the new user
                    const token = jwt.sign({name:body.name, email: body.email, password:body.password },'students');
                    res.send({ token });
                });
            });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

 router.put('/:id', async (req,res)=>{
    const body=req.body
    try{
        const values= [body.name, body.email, body.password]
        const sqlQuery=`UPDATE students SET 
      name = $1, 
      email = $2, 
      password = $3 
      WHERE id=${req.params.id}
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
  const sqlQuery=`ALTER SEQUENCE students_id_seq RESTART WITH 1`
  await db.query(sqlQuery)
  res.send('deleted')
})

router.delete("/:id", async (req, res) => {
  try{
    const sqlQuery=`DELETE FROM students WHERE id=${req.params.id} RETURNING *`
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
