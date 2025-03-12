import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const router = express.Router()

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          return res.json({ loginStatus: true, id: result[0].id });
        }
      })

    } else {
      return res.json({ loginStatus: false, Error: "wrong email or password" });
    }
  });
});

router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT employee.id, employee.name, employee.email, employee.phone, department.department AS department_name 
    FROM employee 
    JOIN department ON employee.department_id = department.id
  `;
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result)
  })
})

// Apply for leave

router.post('/applyleave', (req, res) => {
  const { employee_id, leavetype_id, start_date, end_date, reason } = req.body;

  if (!employee_id) {
    return res.status(400).json({ Status: false, Error: "Employee ID is missing" });
}
  
  console.log("Received Data:", req.body); // 🛠 Debugging Log

  // Check if leave type exists
  const sql = "SELECT * FROM leavetype WHERE id = ?";
  con.query(sql, [leavetype_id], (err, leaveTypeResults) => {
      if (err) {
          console.error("Database Error:", err); // 🛠 Log error
          return res.status(500).json({ Status: false, Error: "Database error", Details: err });
      }
      if (leaveTypeResults.length === 0) return res.json({ Status: false, Error: "Leave type does not exist" });

      const leavetype = leaveTypeResults[0];
      const duration = Number(leavetype.duration); // Ensure it's a number

      // Calculate days difference
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const timeDiff = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (diffDays > duration) {
          return res.json({ Status: false, Error: `Leave duration exceeds the allowed ${duration} days` });
      }

      // Insert leave application
      const query = "INSERT INTO applyleave (employee_id, leavetype_id, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)";
      con.query(query, [employee_id, leavetype_id, start_date, end_date, reason], (err, results) => {
          if (err) {
              console.error("Insert Error:", err); // 🛠 Log error
              return res.status(500).json({ Status: false, Error: "Database insert error", Details: err });
          }
          return res.json({ Status: true, Result: results, Message: "Leave applied successfully!" });
      });
  });
});


export { router as EmployeeRouter }