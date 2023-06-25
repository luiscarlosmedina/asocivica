const express = require("express")
const info = express()
const mysql = require("mysql")
const cors = require("cors")

info.use(cors());
info.use(express.json());

const db= mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "asocivica"
})

info.post("/login", (req,res)=>{
    const sql = 'SELECT * FROM login WHERE ID_Em = ? AND passw = ?'
    db.query(sql, [req.body.usuario],[req.body.password], (err, data) =>{
        if(err) return res.json({Error: "error de logueo"});
        if(data > 0) return res.json({Status: "Success"}); 
        
    })
})

info.get("/empresa",(req,res)=>{

    db.query("SELECT Nit_E, Nom_E,Eml_E FROM empresa",
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
})
info.listen(3001,()=>{
    console.log("corriendo en un puerto");
})