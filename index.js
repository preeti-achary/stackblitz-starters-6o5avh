let express = require('express');
let  cors  = require('cors');

const app = express();
const port = 3000;
app.use=(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];

app.get("/cart/add", (req, res) => {
  let { productId, name, price, quantity } = req.query;
  let newItem = {
    productId: parseInt(productId),
    name: name,
    price: parseFloat(price),
    quantity:parseInt(quantity)
  };

  cart.push(newItem);
  res.json(cart);
})

app.get("/cart/edit", (req, res) => {
  let { productId, quantity } = req.query;
  let id = parseInt(productId);
  let newQuantity = parseInt(quantity);

  let item = cart.find(product => product.productId === id);

  if(item) {
    item.quantity = newQuantity;
    res.json(cart);
  }
});

app.get("/cart/delete" ,(req, res) => {
  let { productId } = req.query;
  let id = parseInt(productId);

  cart = cart.filter(product => product.productId !== id);
  res.json(cart);
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.get("/cart/total-quantity", (req, res) => {
  let totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  res.json({ totalQuantity });
})

app.get("/cart/total-price", (req, res) => {
  let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  res.json({ totalPrice });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
