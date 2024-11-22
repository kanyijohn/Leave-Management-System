import express from "express"; /* express server*/
import cors from 'cors' /* access the server side from the frontend*/
import { adminRouter } from "./Routes/AdminRoute.js";





const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
})) 
app.use(express.json()) /* convert/transfer our data to json format when we parse from our frontend*/
app.use('/auth', adminRouter)

app.listen(3000, () => {
    console.log("Server is running")
})

