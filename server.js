const express = require("express");
const app = express();
const cors=require('cors');

const stripe = require("stripe")('sk_test_51MPmS0LyS0cGFxgpuYNidwscx0rNpMZm7ZI0mRGwkieYNVO8ZPLwEw46rjVMhjJv7ENmwzUOLD9hQj2AljvWtGbV00tI3XZ5kb');

app.use(express.static("public"));
app.use(express.json());
app.use(cors())

const calculateOrderAmount = (items) => {
  return items[0].reduce((acc,elem)=>{
   return Number(acc)+Number(elem);
  },0)
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;


  const paymentIntent = await stripe.paymentIntents.create({
  amount:calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.get('/order/success', async (req, res) => {
  res.send(`<html><body><h1>Thanks for your order Your Order Recieved in 3 Days !</h1><a href='http://localhost:3000/'>Back To Shop</a></body></html>`);
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));