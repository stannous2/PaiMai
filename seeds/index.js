const mongoose = require("mongoose");
const db = require("../models/index");
const userSeed = require('./userSeed');
const yardSaleSeed = require('./yardSaleSeed');
const listingsSeed = require('./listingsSeed');

// This file empties the Books collection and inserts the books below

async function seed() {
    await mongoose.connect(
      process.env.MONGODB_URI ||
      "mongodb://localhost/mongoPaiMai"
    );

    await db.User.remove({})

    await db.User.collection.insertMany(userSeed)

    const users = await db.User.find({})

    await db.YardSale.remove({})

    await db.YardSale.collection.insertMany(yardSaleSeed)

    const yardSales = await db.YardSale.find({})

    users.forEach((user, index) => {
        if (yardSales[index]) {
           user.yardSales.push(yardSales[index])
           user.save()
        }
    })
    
    await db.Listing.remove({})

    await db.Listing.collection.insert(listingsSeed)

    const listingsArr = await db.Listing.find({})

    yardSales.forEach((yardsale) => {
        console.log(`YARDSALE${yardsale}`)
        listingsArr.forEach((listing, index) => {
            yardsale.listings.push(listingsArr[index])
        })
        yardsale.save()
    })
}

seed()