// connect mongoose to DB

const mongoose = require('mongoose');

let connectionString =`mongodb+srv://akshatrait:${process.env.MONGO_PASS}@cluster0.7bwr4l2.mongodb.net/?retryWrites=true&w=majority` 

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// log when connected
mongoose.connection.once('open', ()=> {
    console.log('connected to DATABASE');
});