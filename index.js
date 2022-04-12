import express from 'express';
import cors from 'cors';
import mysql from 'mysql';


const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'devid',
  host: 'localhost',
  password: 'Devid123!', 
  database: 'loginsystem',
  port: '3306',
  debug: 'true'
});

app.post("/register",(req, res) => {

  const password = req.body.password
  const email = req.body.email
  const phone = req.body.phone
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const confirmpass = req.body.confirmpass
  if(password === confirmpass){
  db.query(
    "INSERT INTO users (email,password,phone,firstname,lastname)VALUES (?,?,?,?,?)",
    [email,password,phone,firstname,lastname],
    (err,result) => {
      
      res.status(200).send({email,password,phone,firstname,lastname})

   }
  );
}
  else{
    return res.status(400).send({message:"password and confirm password must be the same"})
  }
});

app.post("/login", (req,res) => {
  const email = req.body.email
  const password = req.body.password

  db.query("SELECT * FROM users WHERE email = ? AND password = ?",
  [email, password],
  (err, result) => {
    if(result.length === 0){
     return res.status(441).send({message: 'wrong email or password'})
    }else{
      if(result){
       return res.status(200).send(result)
      }
      else{
     return  res.send({message: 'Wrong email or password'})
      }
    }
   }
  )
});

app.put("/update/:email", (req,res) => {
  const email = req.body.email
  const phone = req.body.phone
  const firstname = req.body.firstname
  const lastname = req.body.lastname
  const password = req.body.password
  const confirmpass = req.body.confirmpass
  const loginemail = req.params.email
  const biography = req.body.biography
  if(password === confirmpass)
{  db.query("UPDATE users  SET  lastname =? ,password=?, phone=? ,email =?, firstname=?, biography=? WHERE email = ?",
  [lastname,password,phone,email,firstname,biography,loginemail] , 
  (err, result) => {
    if(err){
      console.log(err)
    } else{
      res.status(200).send({lastname,password,phone,email,firstname,biography,loginemail, message: "Profile update successfull"})
    }
  } )}
  else{
    return res.status(400).send({message:"Password and confirm password must be the same"})
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});