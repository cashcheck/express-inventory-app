#! /usr/bin/env node

/*
  if (!userArgs[0].startsWith('mongodb')) {
      console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
      return
  }
  */
let async = require("async");
let brand = require("./models/brand");
let shoe = require("./models/shoe");
let shoeinstance = require("./models/shoeinstance");

let mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user01:1@cluster0.isnfljq.mongodb.net/inventory_app?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

let brands = [];
let shoes = [];
let shoeinstances = [];

function brandCreate(name, cb) {
  let newBrand = new brand({ name: name });

  newBrand.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Brand " + newBrand);
    brands.push(newBrand);
    cb(null, newBrand);
  });
}

function shoeCreate(brand, model, cb) {
  let newShoe = new shoe({ brand, model });

  newShoe.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Shoe: " + newShoe);
    shoes.push(newShoe);
    cb(null, newShoe);
  });
}

function shoeinstanceCreate(shoe, price, colorway, size, condition, cb) {
  let newShoeinstance = new shoeinstance({
    shoe,
    price,
    colorway,
    size,
    condition,
  });

  newShoeinstance.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Shoe: " + newShoeinstance);
    shoes.push(newShoeinstance);
    cb(null, newShoeinstance);
  });
}

function createBrands(cb) {
  async.series(
    [
      function (callback) {
        brandCreate("Nike", callback);
      },
      function (callback) {
        brandCreate("Adidas", callback);
      },
      function (callback) {
        brandCreate("New Balance", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createShoes(cb) {
  async.parallel(
    [
      function (callback) {
        shoeCreate(brands[0], "Air Force 1", callback);
      },
      function (callback) {
        shoeCreate(brands[0], "Air Max 95", callback);
      },
      function (callback) {
        shoeCreate(brands[0], "Killshot 2", callback);
      },
      function (callback) {
        shoeCreate(brands[1], "Stan Smith", callback);
      },
      function (callback) {
        shoeCreate(brands[1], "Samba", callback);
      },
      function (callback) {
        shoeCreate(brands[2], "997", callback);
      },
    ],
    // optional callback
    cb
  );
}

function createShoeinstances(cb) {
  async.parallel(
    [
      function (callback) {
        shoeinstanceCreate(shoes[0], 80, "white", 43, "new", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[0], 35, "white", 45, "used", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[0], 37, "white", 42, "used", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[1], 150, "blackout", 43, "new", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[1], 100, "grey", 40, "used", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[4], 50, "black", 41, "new", callback);
      },
      function (callback) {
        shoeinstanceCreate(shoes[4], 55, "white", 42, "new", callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createBrands, createShoes, createShoeinstances],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("shoeinstances: " + results[2]);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
