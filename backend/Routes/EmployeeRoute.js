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

  // Check if the leave type exists and get its duration
  const sql = "SELECT * FROM leavetype WHERE id = ?";
  con.query(sql, [leavetype_id], (err, leaveTypeResults) => {
      if (err) return res.json({ Status: false, Error: err });
      if (leaveTypeResults.length === 0) return res.json({ Status: false, Error: "Leave type does not exist" });

      const leavetype = leaveTypeResults[0];
      const duration = Array.isArray(leavetype.duration) ? leavetype.duration : [leavetype.duration]; // Assuming duration is in the format "30 working days"

      // Calculate the difference between start_date and end_date
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      // Check if the duration is within the allowed range
      if (diffDays > duration) {
          return res.json({ Status: false, Error: `Leave duration exceeds the allowed ${duration} days` });
      }

      // Insert the leave application
      const query = "INSERT INTO applyleave (employee_id, leavetype_id, start_date, end_date, reason) VALUES (?, ?, ?, ?, ?)";
        con.query(query, [employee_id, leavetype_id, start_date, end_date, reason], (err, results) => {
            if (err) return res.json({ Status: false, Error: err });
            return res.json({ Status: true, Result: results });
        });
    });
});


router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({ Status: true })
})

export { router as EmployeeRouter }