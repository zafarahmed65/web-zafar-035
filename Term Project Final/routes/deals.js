const express = require ('express');
let router = express.Router ();
let Service = require ('../models/service').Service;

router.get ('/deals/cart', async (req, res) => {
  let cart = req.cookies['cart'];
  if (!cart) cart = [];
  let services = await Service.find ({_id: {$in: cart}});
  let total = 0;
  for (let index = 0; index < services.length; index++) {
    total += services[index].price;
  }
  return res.render ('cart', {services, total});
});

router.get ('/deals/remove-from-cart/:id', (req, res) => {
  let cart = req.cookies['cart'];
  if (!cart) cart = [];
  let index = cart.findIndex (c => c == req.params.id);
  if (index !== -1) {
    cart.splice (index, 1);
  }

  res.cookie ('cart', cart);
  return res.redirect ('back');
});

router.get ('/deals/add-to-cart/:id', (req, res) => {
  let cart = req.cookies['cart'];
  if (!cart) cart = [];
  cart.push (req.params.id);
  res.cookie ('cart', cart);
  return res.redirect ('back');
});

router.get ('/deals', async (req, res) => {
  let services = await Service.find ();
  res.render ('deals/index', {
    services,
    pageTitle: 'Top Services Set From Router',
  });
});

module.exports = router;
