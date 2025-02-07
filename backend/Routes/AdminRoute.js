import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';




const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ? and password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "admin", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error:"Wrong Email or Password" });
        }
    
    });
});

router.get('/department', (req, res) => {
  const sql = "SELECT * FROM department";
  con.query(sql, (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.post('/add_department', (req, res) => {
  const sql = "INSERT INTO department (`department`) VALUES (?)"
  con.query(sql, [req.body.department], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  })
})

router.post('/add_employee', (req, res) => {
  const sql = `INSERT INTO employee 
  (name,email,password, phone, department_id) 
  VALUES (?)`;
  bcrypt.hash(req.body.password, 10, (err, hash) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      const values = [
          req.body.name,
          req.body.email,
          hash,
          req.body.phone,
          req.body.category_id
      ]
      con.query(sql, [values], (err, result) => {
          if(err) return res.json({Status: false, Error: err})
          return res.json({Status: true})
      })
  })
})



export { router as adminRouter };