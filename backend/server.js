//impore required midules
const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');

//create an express application
const app = express();

//middleware
app.use(cors()); //middleware that allows cross-origin requests
app.use(express.json()); //middlewares that lets to server reads json data

//database connection
const connectionString = 'mongodb+srv://booktrackeruser:C%2A1996%23t@cluster1.ycz12di.mongodb.net/?appName=Cluster1';
const client = new MongoClient(connectionString);//create a mongodb client - like a tool that knows how to talk to Mongodb. still not connected.
let db;

//connect to the database
async function connectToDatabase() {
    try{
        await client.connect();//establish the connection
        console.log('Connected to MongoDB database successfully');
        db = client.db('booktrackeruser');
        console.log('Database is ready!');
        return db;
    }catch(error){
        console.error('Error connecting to MongoDB database:', error);
        process.exit(1); //exit the process with failure
    }
}
// Initialize database connection
connectToDatabase();

//basic test route
app.get('/', (req, res) => {
    res.json({ message: 'Book tracker api is working ' });
});


//start the server
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
});



