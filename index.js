const express = require('express')
const cors =require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000 ;


//middleware start 
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cufhcv3.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
     
      await client.connect();
     const servicesCollection =client.db('shoptopshopping').collection('services');
     app.get('/services',async(req,res)=>{
        

     })
    } finally {
      
      
    }
  }
  run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello FROM SHOPTO!');
})

app.listen(port, () => {
  console.log(`Shoptop  app listening on port ${port}`)
})