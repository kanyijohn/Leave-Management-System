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

// Get profile for a specific employee
router.get('/detail/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id;
  const sql = `
    SELECT employee.id, employee.name, employee.email, employee.phone, department.department AS department_name 
    FROM employee 
    JOIN department ON employee.department_id = department.id
    WHERE employee.id = ?
  `;
  con.query(sql, [employee_id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err.message });
    return res.json({ Status: true, Result: result });
  });
});

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

    if (leaveTypeResults.length === 0) {
      return res.json({ Status: false, Error: "Leave type does not exist" });
    }

    const leavetype = leaveTypeResults[0];
    const leaveTypeName = leavetype.name.toLowerCase(); // Ensure case-insensitive comparison
    const maxAllowedDays = Number(leavetype.duration); // Ensure it's a number

    // Function to calculate working days (Monday - Friday)
    const calculateWorkingDays = (startDate, endDate) => {
      let start = new Date(startDate);
      let end = new Date(endDate);
      let workingDays = 0;

      while (start <= end) {
        const dayOfWeek = start.getDay(); // 0 = Sunday, 6 = Saturday
        if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Exclude weekends
          workingDays++;
        }
        start.setDate(start.getDate() + 1);
      }
      return workingDays;
    };

    // Calculate leave duration
    let leaveDuration;
    if (leaveTypeName === "annual leave" || leaveTypeName === "paternity leave") {
      leaveDuration = calculateWorkingDays(start_date, end_date); // Count only working days

    } else if (leaveTypeName === "maternity leave") {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const timeDiff = Math.abs(endDate - startDate);
      leaveDuration = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Count all calendar days
      
    } else if (leaveTypeName === "sick leave") {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);
      const timeDiff = Math.abs(endDate - startDate);
      leaveDuration = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Count all calendar days

      // Optional: Set a max limit for sick leave (e.g., 20 days)
      const maxSickLeaveDays = 20; 
      if (leaveDuration > maxSickLeaveDays) {
        return res.json({ Status: false, Error: `Sick leave cannot exceed ${maxSickLeaveDays} days` });
      }
    } else {
      return res.json({ Status: false, Error: "Invalid leave type specified" });
    }

    if (leaveDuration > maxAllowedDays) {
      return res.json({ Status: false, Error: `Leave duration exceeds the allowed ${maxAllowedDays} days` });
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

// Get leave applications for a specific employee
router.get('/leaverequests/:employee_id', (req, res) => {
  const employee_id = req.params.employee_id;
  const sql = `
    SELECT applyleave.employee_id, applyleave.leavetype_id, applyleave.start_date, applyleave.end_date, 
           applyleave.reason, applyleave.status, leavetype.name AS leavetype_name, employee.name AS employee_name
    FROM applyleave
    JOIN employee ON applyleave.employee_id = employee.id
    JOIN leavetype ON applyleave.leavetype_id = leavetype.id
    WHERE applyleave.employee_id = ?
  `;
  con.query(sql, [employee_id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error", Details: err });
    return res.json({ Status: true, Result: result });
  });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({Status: true})
})

export { router as EmployeeRouter }