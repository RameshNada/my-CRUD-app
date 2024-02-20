const express = require ("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require ("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Vishwaa$09",
    database: "crud_contact"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact_db";
    db.query(sqlGet, (error, result) => {
        if (error) {
            console.error(error);
            res.status(500).send("Error fetching data from database");
        } else {
            const contacts = result.map(row => ({
                id: row.id,
                name: row.name,
                email: row.email,
                contact: row.contact
            }));
            res.json(contacts);
        }
    });
});


app.post("/api/post", (req, res) =>{
    const {name, email, contact} = req.body;
    const sqlInsert= "INSERT INTO contact_db (name, email, contact) VALUES (?, ?, ?)";
    db.query(sqlInsert, [name, email, contact], (error, result) =>{
        if(error){
            console.log(error)
        }
    });

});
app.delete("/api/remove/:id", (req, res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error){
            console.log(error);
           // res.status(500).send("Error deleting contact");
        //} else {
           // res.send("Contact deleted successfully");
        }
    });
});

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "SELECT * FROM contact_db WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            console.log(error);
        }
        res.send(result);
        });
    });

// update API            
app.put("/api/update/:id", (req, res) =>{
    const {id} = req.params;
    const {name, email, contact} = req.body;
    const sqlUpdate= "UPDATE contact_db SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) =>{
        if(error){
            console.log(error)
            res.status(500).send("Error updating contact");
        } else {
        res.send(result)
        }
    });
});

app.get("/", (req, res) =>{
 //   const sqlInsert = "INSERT INTO contact_db (name, email, contact) VALUES ('Suresh', 'suresh@gmail.com', 2626262626)";
  //  db.query(sqlInsert, (error, result)=>{
  //      console.log("error", error);
  //      console.log("result", result);
  //      res.send("Hello Express");
  //  });    
});

app.listen(5000, () =>{
    console.log("server is running on port 5000");
})