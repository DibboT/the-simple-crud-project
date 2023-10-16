const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

require('dotenv').config();





const uri = "mongodb+srv://DB_USER:DB_PASS@cluster0.igadn9s.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db("usersDB");
    const userCollection = database.collection("users");

    app.get('/users', async(req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.post('/users', async(req, res) =>{
      const user = req.body;
      console.log(user)
      const result = await userCollection.insertOne(user);
      res.send(result);
    } )

    app.delete('/users/:id', (req, res) =>{
      const id = req.params.id;
      console.log('Please Delete This One', id)
    } )

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Simple Crud Sever Is Running')
})

app.listen(port, ()=> {
    console.log(`Simple Crud is Running On Port: ${port}`)

})