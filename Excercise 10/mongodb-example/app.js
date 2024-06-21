const express = require('express');
const {MongoClient, ServerApiVersion} = require('mongodb');

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ping: 1});
  console.log(
      "Pinged your deployment. You successfully connected to MongoDB!");

  runServer(client);
}

run().catch(console.dir);

function runServer(client) {
  const app = express();
  const port = 3000;

  const db = client.db('hs');

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });

  app.use(express.json());

  const posts = [
    {
      title: 'REST API',
      body: 'REST is an acronym for REpresentational State Transfer',
    },
    {
      title: 'JavaScript',
      body: 'Here we learn JavaScript, starting from scratch',
    },
  ];

  db.collection('posts').insertMany(posts).catch(console.log);

  app.get('/posts', async (req, res) => {
    const posts = await db.collection('posts').find().toArray();
    res.json(posts).status(200);
  });

  app.post('/posts', async (req, res) => {
    const result = await db.collection('posts').insertOne(req.body);
    res.json(result).status(200);
  });
}
