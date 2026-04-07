const mongoose = require("mongoose");

const dns = require("dns");

require("dotenv").config();

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function main() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@cluster0.bncfxdf.mongodb.net/?appName=Cluster0`,
    );

    console.log("Conectado ao banco!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
