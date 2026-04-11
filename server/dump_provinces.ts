import databaseService from "./src/services/database.services.js";

async function dumpProvinces() {
    await databaseService.connect();
    const provinces = await databaseService.provinces.find({}).limit(5).toArray();
    console.log(JSON.stringify(provinces, null, 2));
    process.exit(0);
}

dumpProvinces();
