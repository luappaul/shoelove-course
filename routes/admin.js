const express = require("express");
const router = new express.Router();
const product = require("../models/Product");
const hbs = require("hbs");

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

//////////////Prop Add

router.get("/prod-add", (req, res) => {
  res.render("products_add");
});

router.post("/prod-add", (req, res) => {
  const {
    name,
    ref,
    sizes,
    description,
    category,
    price,
    img,
    id_tags
  } = req.body;
  product
    .create({
      name,
      ref,
      sizes,
      description,
      category,
      price,
      img,
      id_tags
    })
    .then(dbRes => {
      res.redirect("/prod-add");
    })
    .catch(err => {
      res.redirect("/");
    });
});

router.get("/prod-manage", (req, res) => {
  product
    .findby()
    .then(prod => {
      res.render("products_manage", { prod });
    })
    .catch();
});

router.get("/product_edit/:id", (req, res) => {
  product
    .findById(req.params.id)
    .then(prod => {
      console.log("hello" + prod);
      res.render("product_edit", { prod });
    })
    .catch(err => console.log(err));
});

router.post("/product_edit/:id", (req, res) => {
  console.log(req.body);
  const {
    name,
    ref,
    size,
    descr,
    price,
    mainCategory,
    sneackerSecondaryCat
  } = req.body;
  product
    .findByIdAndUpdate(req.params.id, {
      name: name,
      ref: ref,
      size: size,
      descr: descr,
      price: price,
      mainCategory: mainCategory,
      sneackerSecondaryCat: sneackerSecondaryCat
    })
    .then(prod => res.render("product_edit", { prod }))
    .catch();
});

hbs.registerPartials(__dirname + "/views/partials");

module.exports = router;
