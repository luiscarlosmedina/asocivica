const express = require("express")
const info = express()
const mysql = require("mysql")
const cors = require("cors")
const bodyParser = require('body-parser')

info.use(cors());
info.use(express.json());
info.use(bodyParser.urlencoded({extended: false}))
info.use(bodyParser.json({limit:'10mb'}))

const db= {
    host : "localhost",
    user: "root",
    password: "",
    database: "asocivica"
}

info.get('/',(req,res)=>{
    res.send('hola soy una ruta de api')
})

info.post("/api/login", (req,res)=>{
    const {ID_Em, passw} = req.body
    const values = [ID_Em, passw] 
    let connection = mysql.createConnection(db)
    connection.query('SELECT * FROM login WHERE ID_Em = ? AND passw = ?', values, (err, result)=>{
        if (err) {
            res.status(500).send(err)
        }else{
            
           if (result.length > 0) {
                res.status(200).send({
					"ID_Em": result[0].ID_Em,
                    "ID_log": result[0].ID_log
           })
                
           }else{
            
            res.status(400).send('Usuario no existem')
           }
           
        }
    })

})

info.listen(3001,()=>{
    console.log("corriendo en un puerto");
})