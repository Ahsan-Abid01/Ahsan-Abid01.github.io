const router=require('express').Router();

router.get('/',(req,res)=>{
    res.send('DATA');
});
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51MPmS0LyS0cGFxgpuYNidwscx0rNpMZm7ZI0mRGwkieYNVO8ZPLwEw46rjVMhjJv7ENmwzUOLD9hQj2AljvWtGbV00tI3XZ5kb');

router.get('/create-payment-intent', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  const customer = await stripe.customers.retrieve(session.customer);

  res.send(`<html><body><h1>Thanks for your order, ${customer.name}!</h1></body></html>`);
});


module.exports=router;