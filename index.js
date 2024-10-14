const { urlencoded } = require("body-parser")
let express=require("express")
const cors=require("cors")
const sql=require("mysql2")

let app=express()

app.use(cors());
app.use(express.json());

app.use(urlencoded({extended:true}))

let conn=sql.createConnection({
    host:"localhost",
    user:"root",
    password:"knps",
    database:"users"
    
})

conn.connect((err)=>{
    if(err){
        res.send(err)
    }
    else{
        console.log("Connected to database");
        
    }
})
// app.use(cors({
//     origin: 'http://127.0.0.1:5500' // Allow only this origin
// }));

app.post("/",(req,res)=>{
    conn.query(`CREATE TABLE register (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(50),
    email VARCHAR(100),
    contact VARCHAR(30)
);
`,(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/register",(req,res)=>{
    // res.send(req.body)

    // console.log(req.body);
    let data={
        ...req.body
     }
         conn.query("insert into register set ?",data,(err,result)=>{
             if(err){
                 res.send(err)
             }
             else{

                 res.send("Thanks")
                               
             }
         })
    
    // res.send("Thanks for registering")
})

app.get("/login",(req,res)=>{
    conn.query("select * from register",(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)    
            console.log(result);
                    
        }
    })
})

app.get("/users",(req,res)=>{
    conn.query("select * from register",(err,result)=>{
        if(err){
            res.send(err)
        }
        else{
            res.send(result)    
            // console.log(result);
                    
        }
    })
})


app.listen(3012,()=>{
    console.log("Server started!!");
})