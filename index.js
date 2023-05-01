import express from "express"
import mysql from "mysql"
import cors from "cors"
 
const app = express()

const db = mysql.createConnection({
    host :"localhost",
    user : "root",
    password : "1",
    database :"nodjsdb"
})

// this middelwer hellp to send any outsid data by client

app.use(express.json())
app.use(cors())




app.get("/books" ,(req,res)=> {
    const q ="SELECT * FROM books"
    db.query(q,(err ,data)=>{
        if(err) return res.json(err)
        return  res.json(data)
    })
})
app.post("/book" ,(req,res)=> {
    const q ="INSERT INTO books (`title` ,`description`,`cover`,`price`) VALUES(?)"
    // const value = ["test from backend title1","test from backend desc1"]
     const value = [
        req.body.title ,
        req.body.description,
        req.body.cover,
        req.body.price
     ]
    db.query(q,[value],(err ,data)=>{
        if(err) return res.json(err)
        return  res.json("book has been created successfully !")
    })
})

app.put("/book/:id" ,(req,res)=> {
    const bookId = req.params.id;
    const q ="UPDATE books SET `title`= ? ,`description` = ? ,`cover` = ? ,`price`= ?  WHERE id = ?" ;
     const value = [
        req.body.title ,
        req.body.description,
        req.body.cover,
        req.body.price
     ]
    db.query(q,[...value,bookId],(err ,data)=>{
        if(err) return res.json(err)
        return  res.json("book has been updated successfully !")
    })
})

app.delete("/book/:id" ,(req,res)=> {
    const bookId = req.params.id;
    const q ="DELETE FROM books WHERE id = ?"
   
    
    db.query(q,[bookId],(err ,data)=>{
        if(err) return res.json(err)
        return  res.json("book has been deleted successfully !")
    })
})

app.listen(8080,()=> {
    console.log("test conncted backend 11E3")
})