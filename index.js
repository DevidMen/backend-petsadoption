import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import loginValidation from './middlewares/loginValidation.js';
import formValidation from './middlewares/formValidation.js';
import formupdateValidation from './middlewares/formupdateValidation.js';
import bcrypt from 'bcrypt'
import updatePassValidation from './middlewares/updatePassValidation.js';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import jwt from 'jsonwebtoken'


const PORT = process.env.PORT || 3001;
const app = express();
const saltRounds = 10

app.use(cors())
/*
app.use(cors({
origin : ["http://localhost:3000"],
methods: ["GET" ,"POST", "PUT"],
credentials: true
}
))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
key:"currentUser",
secret: "devid",
resave: false,
saveUninitialized:false,
cookie: {expires: 60 * 60 * 24}
}))
*/
app.use(express.json())
const db = mysql.createPool({
  connectionLimit : 100,
  user: 'devid',
  host: 'localhost',
  password: 'Devid123!', 
  database: 'loginsystem',
  port: '3306',
  debug: 'true'
});
db.getConnection(function(err) {
    if (err){ console.log("error: " + err) 
      connection.release();
    };
  const mysql = "CREATE TABLE  if not exists users(email VARCHAR(45), firstname VARCHAR(45), lastname VARCHAR(45), password VARCHAR(500), phone VARCHAR(45) , biography VARCHAR(45))";
  db.query(mysql, function (err, result) {
    if (err) {console.log(err)}
  });
});


app.post("/register",formValidation,(req, res) => {

  const password = req.body.password
  const email = req.body.email
  const phone = req.body.phone
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const confirmpass = req.body.confirmpass
  
bcrypt.hash(password , saltRounds, (err , hash) => {
  if(err) {
    console.log(err)
  }
  db.query("SELECT email FROM users WHERE email = '"+ email +"'", function(err, result, field){
    if(result.length === 0){
      if(password === confirmpass){
        db.query(
          "INSERT INTO users (email,password,phone,firstname,lastname)VALUES (?,?,?,?,?)",
          [email,hash,phone,firstname,lastname],
          (err,result) => {
            res.status(200).send({email,hash,phone,firstname,lastname})
         }
        );
      }
        else{return res.status(401).send({message:"password and confirm password must be the same"})}}
        else{return res.status(401).console.log({message:"user exist"})}})
})

});
/*
const verifyJWT = (req,res,next) => {
  const token = req.headers("x-access-token")
  if(!token){
    res.send('need token')
  }else{
    jwt.verify(token, "jwtsecret", (err, decoded) => {
      if(err){
        res.json({authorized : false , message: "failed token"})
      }else{
        req.currentUserEmail = decoded.email;
        next()
      }
    })
  }
}
app.get('/isUserAuthorized', verifyJWT , (req,res) =>{
  res.send('Authorized')
})
*/
app.post("/login", loginValidation ,(req,res) => {
  const email = req.body.email
  const password = req.body.password

  db.query("SELECT * FROM users WHERE email = ? ",
  [email],
  (err, result) => {
    if(result >= 0){
     return res.status(401).send({message: 'wrong email or password'})
    }else{
      if(result){
        bcrypt.compare(password, result[0].password, (err, responsepass) => {
          if(responsepass){
             res.send(result)
          //  const email = result[0].email
           // const token = jwt.sign({email}, 'jwtsecret' ,{
             // expiresIn: 300, 
            
           // })
           // req.session.currentUser = result
         //   res.json({authorized : true, token: token, result:result})
          }else{
            res.status(400).send({message : "Wrong email or password"})
          }
        })
      }
      else{
       res.status(400).send({message: 'User does not exists '})
      }
    }
   }
  )
});
/*
app.get('/login', (req,res) =>{
if(req.session.currentUser){
res.send({isAuth : true, currentUser: req.session.currentUser})
}else{
res.send({isAuth:false})
}
})
*/
app.put("/update/:email",formupdateValidation, (req,res) => {
  const email = req.body.email
  const phone = req.body.phone
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const loginemail = req.params.email
  const biography = req.body.biography

  db.query("SELECT email FROM users WHERE email = '"+ email +"'", function(err, result, field){
    if(result.length === 0 || loginemail === result[0].email){
          db.query("UPDATE users  SET  lastname =? , phone=? ,email =?, firstname=?, biography=? WHERE email = ?",
        [lastname,phone,email,firstname,biography,loginemail] , 
        (err, result) => {
          if(err){
            console.log(err)
          } else{
            res.status(200).send({lastname,phone,email,firstname,biography,loginemail, message: "Profile update successfull"})
          }
        } )
    }
    else{return res.status(401).send({message:"user exist"})}
})
})

app.put("/update/password/:email",updatePassValidation, (req,res) => {
  const email = req.body.email
  const password = req.body.password
  const confirmpass = req.body.confirmpass
  const loginemail = req.params.email
  bcrypt.hash(password , saltRounds, (err , hash) => {
    if(err) {
      console.log(err)
    }
  db.query("SELECT email FROM users WHERE email = '"+ email +"'", function(err, result, field){
    if(result.length === 0 || loginemail === result[0].email){
    if(password === confirmpass){
          db.query("UPDATE users  SET   password=? WHERE email = '"+ email +"'",
        [hash] , 
        (err, result) => {
          if(err){
            console.log(err)
          } else{
            res.status(200).send({hash, message: "Password update successfull"})
          }
        } )
    }
    else{return res.status(401).send({message:"password and confirm password must be the same"})}
  }
})
})
})


/*
app.post('/logout' , (req,res) => {
  req.session.destroy(err=>{
    res.redirect('/')
  })
})
*/
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});



 