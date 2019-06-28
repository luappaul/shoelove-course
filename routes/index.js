const express = require("express");
const router = new express.Router();
const user = require("../models/User");
const app = express();
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const product = require("../models/Product");

//route

router.get(["/", "/home"], (req, res) => {
  if (req.session.currentUser) {
    res.render("index"), console.log("you're log in");
  } else {
    res.render("index");
  }
});

router.get(["/men"], (req, res) => {
  product
    .find()
    .then(prod => {
      const productByCat = [];
      for (let i = 0; i < prod.length; i++) {
        if (prod[i].category === "Men") {
          productByCat.push(prod[i]);
        }
      }

      res.render("products", { productByCat });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get(["/women"], (req, res) => {
  product
    .find()
    .then(prod => {
      const productByCat = [];
      for (let i = 0; i < prod.length; i++) {
        if (prod[i].category === "Women") {
          productByCat.push(prod[i]);
        }
      }

      res.render("products", { productByCat });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get(["/kids"], (req, res) => {
  product
    .find()
    .then(prod => {
      const productByCat = [];
      for (let i = 0; i < prod.length; i++) {
        if (prod[i].category === "Kids") {
          productByCat.push(prod[i]);
        }
      }

      res.render("products", { productByCat });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get(["/collection"], (req, res) => {
  product
    .find()
    .then(productByCat => {
      res.render("products", { productByCat });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get(["/collection", "/kids", "/women", "/men"], (req, res) => {
//   product
//     .find()
//     .then(prod => {
//       const productByCat = [];
//       for (let i = 0; i < prod.length; i++) {
//         if (prod[i].category === "Men") {
//           productByCat.push(prod[i]);
//         }
//       }
//       console.log(productByCat);
//       res.render("products", { productByCat });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

///////////////////////
///////////////////////
//////SIGNUP///////////
///////////////////////
///////////////////////

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  if (name === "" || lastname === "" || password === "") {
    res.render("/signup", { message: "indicate username and password" });
    return;
  }

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new user({
    name: name,
    lastname: lastname,
    email: email,
    password: hashPass
  });

  newUser
    .save()
    .then(() => res.render("signup"))
    .catch(err => console.log(err));
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

///////////////////////
///////////////////////
//////LOGIN////////////
///////////////////////
///////////////////////

router.post("/login", (req, res, next) => {
  const theEmail = req.body.email;
  const thePassword = req.body.password;

  if (theEmail === "" || thePassword === "") {
    res.render("login", {
      errorMessage:
        "Please enter your email adress and your password to sign up"
    });
    return;
  }

  user
    .findOne({ email: theEmail })
    .then(user => {
      if (!user) {
        res.render("login", { errorMessage: "the email doesn't exist" });
        return;
      }
      if (bcrypt.compareSync(thePassword, user.password)) {
        console.log(req.session);
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("login"), { errorMessage: "incorrect password" };
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/one-product", (req, res) => {
  res.render("one_product");
});

module.exports = router;
