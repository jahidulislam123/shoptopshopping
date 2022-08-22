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
     
     
     
      // admin post product
      app.post('/productPost',async(req,res)=>{
        const newProduct  =req.body;
        const result =await productsCollection.insertOne(newProduct);
        res.send(result);
     })
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

   
    
  // user 
  //users data post
  app.post('/userPost',async(req,res)=>{
    const newPost  =req.body;
    const result =await usersCollection.insertOne(newPost);
    res.send(result);
 })

  //users data get 
  app.get('/users',async(req,res)=>{

    const query ='';
    const cursor =usersCollection.find(query);
    const products =await cursor.toArray();
    res.send(products);

 })
 //users delete 
 app.delete('/users/:id',async(req,res)=>{
  const id=req.params.id;
  const query ={_id:ObjectID(id)}
  const result =await usersCollection.deleteOne(query);
  res.send(result);
})

  // orders API 

  // order Post by users 
  app.post('/orderPost',async(req,res)=>{
    const orderPost  =req.body;
    const result =await ordersCollection.insertOne(orderPost);
    res.send(result);
 })

  //ALL ORDERS GETTING
  
  app.get('/orders',async(req,res)=>{

    const query ='';
    const cursor =ordersCollection.find(query);
    const products =await cursor.toArray();
    res.send(products);

 })

 //my orders getting
 app.get('/order/:email',async(req,res)=>{
  const email =req.params.email;
  const query ={email:email};
  const booking =await ordersCollection.find(query); 
  const booking2 =await booking.toArray();
  res.send(booking2);
})

//delete my  orders and delete  order by admin
app.delete('/order/:id',async(req,res)=>{
  const id=req.params.id;
  const query ={_id:ObjectID(id)}
  const result =await ordersCollection.deleteOne(query);
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