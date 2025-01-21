const mongoose = require("mongoose");
const Listing = require("../models/listings");
const initData = require("./data");
require("dotenv").config({ path: '../.env' });

// main()
// .then(() => {
//     console.log("connection successful");
// })
// .catch((err) => {
//     console.log(err);
// });

// async function main() {
//     await mongoose.connect(process.env.DB_URL);
// }

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((obj) => ({...obj, owner: "675528e86e16cf1a3a9f6a1a"}));
//     await Listing.insertMany(initData.data);
// }

// initDB();

// console.log("MongoDB URI:", process.env.DB_URL);

const main = async () => {
    try {
        const dbURI = process.env.DB_URL;
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Atlas successfully!");
    } catch (error) {
        console.error("Failed to connect to MongoDB Atlas:", error);
        process.exit(1);
    }
};

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log("Listings collection cleared.");

        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: process.env.s_owner,
        }));
        await Listing.insertMany(initData.data);
        console.log("Database initialized with sample data.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

(async () => {
    await main(); 
    await initDB(); 
})();
