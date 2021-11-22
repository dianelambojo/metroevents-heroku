const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");

app.use(morgan('short'))

app.use(bodyParser.json());

app.set('view engine', 'ejs')

//mysql://bee396f6cfcd57:29fcd5a4@us-cdbr-east-04.cleardb.com/heroku_a9a5491c2f2da3e?reconnect=true
const db = mysql.createConnection({
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'bee396f6cfcd57',
    password: '29fcd5a4',
    database: 'heroku_a9a5491c2f2da3e'
})

app.get('/getUsers', function(req,res){
    db.query('SELECT * FROM user', (err,rows)=>{
        console.log("SUccess");
        console.log(rows);
        res.json(rows);
    })
    
})

app.post('/postUsers', function(req, res){

    var username =req.body.username;
    var firstname =req.body.firstname;
    var middlename =req.body.middlename;
    var lastname =req.body.lastname;
    var password =req.body.password;
    var emailAddress =req.body.emailAddress;
    var gender =req.body.gender;
    var birthdate =req.body.birthdate;

    db.query("INSERT INTO user(username,firstname,middlename,lastname,password,emailAddress,gender,birthdate) values (?, ?, ?, ?, ?, ?, ?, ?)",[username,firstname,middlename,lastname,password,emailAddress,gender,birthdate],function(error, result, fields){
    res.json({
        status: 1,
        message: "User Data Inserted Successful",
        data: result
    });
   // res.render('pages/index', { rows });

});
});

// app.get('/user/:id', (req, res) => {
//     console.log("fetching user with id: " + req.params.id)
//     const userId = req.params.id
//     const queryString = "SELECT * FROM auth_user WHERE id = ?" //& SELECT * FROM user WHERE user_id = ?"
//     connection.query(queryString, [userId], (err, rows, fields) => {
//         if (err) {
//             console.log("failed to query for users:", + err)
//             res.sendStatus(500)
//             return 
//         }
//         console.log("fetched users succesfully")
//         res.json(rows)
//     })


// })
// app.get("/", (req, res) => {
//     console.log("Responding to root route")
//     res.send("hello from root")
// })

// app.get("/users", (req, res) => {
//     var user1 = {firstName: "Diane", lastName: "lambojo"}
//     const user2 = {firstName: "diane", lastName: "gwapa"}

//     res.json([user1, user2])
//     // res.send("nodemon auto updates when i save this file")
// })

app.listen(3003, () => {
    console.log("server is listening on 3003..")
})
