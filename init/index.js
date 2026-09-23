const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/StaySphere";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); // if data is already there then clean it
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "6ab181a9cb6522ac35484381",
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was initialized");
};
initDB();
