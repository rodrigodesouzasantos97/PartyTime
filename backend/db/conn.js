const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://rodrigo:<password>@cluster0.bncfxdf.mongodb.net/?appName=Cluster0",
    );

    console.log("Conectado ao banco!");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
