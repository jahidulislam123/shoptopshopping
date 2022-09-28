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
      //first 5 collection are made for just practice 
      const servicesCollection =client.db('shoptopshopping').collection('services');
      const productsCollection =client.db('shoptopshopping').collection('products');
      const usersCollection =client.db('shoptopshopping').collection('users');
      const bookingCollection =client.db('shoptopshopping').collection('booking');
      const ordersCollection =client.db('shoptopshopping').collection('orders');
      // all the collection of cluster set at above are for testing and 
      // the collection of cluster below is made for real data 
      const slideCollection =client.db('shoptopshopping').collection('slideData');
      const topsellerCollection =client.db('shoptopshopping').collection('topSeller');
      const flashDealsCollection =client.db('shoptopshopping').collection('flashDeals');
      const menDataCollection =client.db('shoptopshopping').collection('menData');
      const womenDataCollection =client.db('shoptopshopping').collection('womenData');
      const kidsDataCollection =client.db('shoptopshopping').collection('kidsData');
     
     
     
      // admin post product
      app.post('/productPost',async(req,res)=>{
        const newProduct  =req.body;
        const result =await productsCollection.insertOne(newProduct);
        res.send(result);
     })



    //  all Data products 
      app.get('/products',async(req,res)=>{

        const query ='';
        const cursor =productsCollection.find(query);
        const products =await cursor.toArray();
        res.send(products);

     })
     


     //get all topseller data 
     app.get('/topseller',async(req,res)=>{
      const query ='';
      const cursor = topsellerCollection.find(query);
      const products =await cursor.toArray();
      res.send(products);
     })

     // post topspller data
     app.post('/topsellserPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await topsellerCollection.insertOne(newProduct);
      res.send(result);
   })
 
      
     //get all topseller data delete
      app.delete('/topseller/:id',async(req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectID(id)}
        const result =await topsellerCollection.deleteOne(query);
        res.send(result);
    })



     //   now starting men data from here 
    //get all men data 
    app.get('/menData',async(req,res)=>{
      const query ='';
      const cursor = menDataCollection.find(query);
      const products =await cursor.toArray();
      res.send(products);
     })

     // post men data
     app.post('/menDataPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await menDataCollection.insertOne(newProduct);
      res.send(result);
   })
 
      
     //get all men data delete
      app.delete('/menData/:id',async(req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectID(id)}
        const result =await menDataCollection.deleteOne(query);
        res.send(result);
    })
     
     // here end the men data 


     //women data started
    //women all men data 
    app.get('/womenData',async(req,res)=>{
      const query ='';
      const cursor = womenDataCollection.find(query);
      const products =await cursor.toArray();
      res.send(products);
     })

     // post women data
     app.post('/womenDataPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await womenDataCollection.insertOne(newProduct);
      res.send(result);
   })
 
      
     //get all women data delete
      app.delete('/womenData/:id',async(req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectID(id)}
        const result =await womenDataCollection.deleteOne(query);
        res.send(result);
    })

     //women data end here 



     //kids data started
    //kids all men data 
    app.get('/kidsData',async(req,res)=>{
      const query ='';
      const cursor = kidsDataCollection.find(query);
      const products =await cursor.toArray();
      res.send(products);
     })

     // post kids data
     app.post('/kidsDataPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await kidsDataCollection.insertOne(newProduct);
      res.send(result);
   })
 
      
     //get all kids data delete
      app.delete('/kidsData/:id',async(req,res)=>{
        const id=req.params.id;
        const query ={_id:ObjectID(id)}
        const result =await kidsDataCollection.deleteOne(query);
        res.send(result);
    })

     //kids data end here 



    //Flash Deals all data getting 
    app.get('/flashDeals',async(req,res)=>{
      const query ='';
      const cursor =flashDealsCollection.find(query);
      const product =await cursor.toArray();
      res.send(product);
    })

    //  flash deals post data getting
    app.post('/flashDealsPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await flashDealsCollection.insertOne(newProduct);
      res.send(result);
   })


   // flash deals delete from the collection 
   app.delete('/flashDeals/:id',async(req,res)=>{
    const id=req.params.id;
    const query ={_id:ObjectID(id)}
    const result =await flashDealsCollection.deleteOne(query);
    res.send(result);
})



     //slide data getting
     app.get('/slideData',async(req,res)=>{
      const query ='';
      const cursor =slideCollection.find(query);
      const product =await cursor.toArray();
      res.send(product);

     })
            
     //post slideData 
     app.post('/slideDataPost',async(req,res)=>{
      const newProduct  =req.body;
      const result =await slideCollection.insertOne(newProduct);
      res.send(result);
   })

     //  all slideData products  delete
     app.delete('/slideData/:id',async(req,res)=>{
      const id=req.params.id;
      const query ={_id:ObjectID(id)}
      const result =await slideCollection.deleteOne(query);
      res.send(result);
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





    // users ALL details 
    app.get('/usersDetails',async(req,res)=>{
      //ekhane pore korbo mam \class e cole asce 
      

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