const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3001;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //

app.get('/books',async(req,res)=>{
    let response = await Book.find();
    res.send(response)
})
// findById
app.get('/books/:idOfBook',async(req,res)=>{
    let id = req.params.idOfBook;
    let response = await Book.findById(id);
    res.send(response)
})
// findOne
app.get('/books',async(req,res)=>{
    const query = req.query; // Use req.query to access query parameters
    try {
        const response = await Book.findOne(query);
        if (response) {
            res.send(response);
        } else {
            res.status(404).send("Book not found");
        }
    } catch (error) {
        res.status(500).send("Internal server error");
    }
})


// find   - finds everything

// .find()

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;
    
    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

app.delete("/books/:idOfBook", async(req,res)=>{
    let id = req.params.idOfBook
    let response = await Book.findByIdAndDelete(id);
    res.send(response)
})


app.put("/books/:idOfBook", async (req,res)=>{
    let id = req.params.idOfBook;
    let update = req.body
    let response = await Book.findByIdAndUpdate(id, update)
    res.send(response)
})
// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


