const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],
        credentials: true
    }
))


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})


const verifyUser = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.json({ Message: "we need token please provide it." })
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({ Message: "Autherntication Error" })
            } else {
                req.name = decoded.name
                next()
            }
        })
    }
}

app.get('/',verifyUser,(req,res)=>{
    return res.json({ Status: "Success", name: req.name })
})


app.get('/Logout', (req,res) => {
    res.clearCookie('token')
    return res.json({Status : "Success"})

})


app.post('/Login', (req, res) => {
    const sql = "SELECT * FROM login WHERE email = ? AND password = ? "
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json({ Message: "Server Side Error" })
        if (data.length > 0) {
            const name = data[0].name
            const token = jwt.sign({ name }, "our-jsonwebtoken-secret-key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Message: "No Records Existed" })
        }
    })
})




app.listen(5050, () => {
    console.log("Server is running in port 5050")
})
