const express = require('express')
const cors =require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000 ;


//middleware start 
app.use(cors());
app.use(express.json());
//middleware end 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cufhcv3.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
     
      await client.connect();
      const servicesCollection =client.db('shoptopshopping').collection('services');
      const productsCollection =client.db('shoptopshopping').collection('products');
      const usersCollection =client.db('shoptopshopping').collection('users');
      const bookingCollection =client.db('shoptopshopping').collection('booking');
      const ordersCollection =client.db('shoptopshopping').collection('orders');
     
    //  all products 
      app.get('/products',async(req,res)=>{

        const query ='';
        const cursor =productsCollection.find(query);
        const products =await cursor.toArray();
        res.send(products);

     })

    //  specific one id  products 

    app.get('/details/:id',async(req,res)=>{
      const id =req.params.id;
      const query ={_id:ObjectId(id)};
      const booking =await productsCollection.findOne(query); 
      res.send(booking);
    })



    // men products 
    app.get('/men',async(req,res)=>{
      const filter ={category:'Men'};
      const filtering = await productsCollection.find(filter);
      const filtering3 =await filtering.toArray(filtering)
      res.send(filtering3);
    })

    // women products 
    app.get('/women',async(req,res)=>{
      const filter ={category:'women'};
      const filtering = await productsCollection.find(filter);
      const filtering3 =await filtering.toArray(filtering)
      res.send(filtering3);
    })

    // children products 
    app.get('/children',async(req,res)=>{
      const filter ={category:'children'};
      const filtering = await productsCollection.find(filter);
      const filtering3 =await filtering.toArray(filtering)
      res.send(filtering3);
    })

    // delete products
    app.delete('/product/:id',async(req,res)=>{
      const id=req.params.id;
      const query ={_id:ObjectID(id)}
      const result =await productsCollection.deleteOne(query);
      res.send(result);
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