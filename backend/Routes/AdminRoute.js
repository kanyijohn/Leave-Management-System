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
  });
});

router.post('/add_department', (req, res) => {
  const sql = "INSERT INTO department (`department`) VALUES (?)"
  con.query(sql, [req.body.department], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true})
  });
});

router.post('/add_employee', (req, res) => {
  const { name, email, password, phone, department_id } = req.body;

  // Validate required fields
  if (!name || !email || !password || !phone || !department_id) {
      return res.json({ Status: false, Error: "All fields are required" });
  }

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
          console.error("Password Hashing Error: ", err);
          return res.json({ Status: false, Error: "Password Hashing Error", Details: err });
      }

      const sql = `INSERT INTO employee (name, email, password, phone, department_id) VALUES (?, ?, ?, ?, ?)`;
      const values = [name, email, hash, phone, department_id];

      con.query(sql, values, (err, result) => {
          if (err) {
              console.error("SQL Error: ", err);
              return res.json({ Status: false, Error: "Query Error", Details: err });
          }
          return res.json({ Status: true });
        });
    });
});

router.get('/employee', (req, res) => {
  const sql = `
  SELECT employee.id, employee.name, employee.email, employee.phone, department.department AS department_name 
  FROM employee 
  JOIN department ON employee.department_id = department.id
`;
con.query(sql, (err, result) => {
  if (err) return res.json({ Status: false, Error: "Query Error" });
  return res.json({ Status: true, Result: result });
});
});

router.get('/employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee WHERE id = ?";
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"})
      return res.json({Status: true, Result: result})
  })
})

router.put('/edit_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee 
      set name = ?, email = ?, phone = ?, department_id = ? 
      Where id = ?`
  const values = [
      req.body.name,
      req.body.email,
      req.body.phone,
      req.body.department_id
  ]
  con.query(sql,[...values, id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/delete_employee/:id', (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee where id = ?"
  con.query(sql,[id], (err, result) => {
      if(err) return res.json({Status: false, Error: "Query Error"+err})
      return res.json({Status: true, Result: result})
  })
})

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})



export { router as adminRouter };