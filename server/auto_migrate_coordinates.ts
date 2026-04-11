import databaseService from "./src/services/database.services.js";
import axios from 'axios';

// Utility to sleep between API calls to respect Nominatim's usage policy (1 request/sec)
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchCoordinates(query: string) {
    try {
        // We add "Vietnam" to the query to ensure accuracy
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + ', Vietnam')}&format=json&limit=1`;
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Secondhand_Ecommerce_Assistant'
            }
        });
        
        if (response.data && response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon)
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching coordinates for ${query}:`, error);
        return null;
    }
}

async function startProfessionalMigration() {
    console.log("Starting Precise Coordinate Migration using OpenStreetMap API...");
    await databaseService.connect();
    
    const provinces = await databaseService.provinces.find({}).toArray();
    let totalUpdated = 0;

    for (const province of provinces) {
        console.log(`\nProcessing: ${province.name}...`);
        
        // 1. Get Province Coordinates
        const pCoords = await fetchCoordinates(province.name);
        await sleep(1000); // Respect API limits

        const campusList = province.campus || [];
        const campusData = [];

        // 2. Get Each Campus Coordinates
        for (const campusName of campusList) {
            console.log(`  - Fetching precise location for: ${campusName}`);
            const coords = await fetchCoordinates(campusName);
            
            if (coords) {
                campusData.push({
                    name: campusName,
                    lat: parseFloat(coords.lat.toFixed(4)),
                    lng: parseFloat(coords.lng.toFixed(4))
                });
            } else {
                // Fallback to province coordinates if campus not found
                campusData.push({
                    name: campusName,
                    lat: pCoords ? parseFloat(pCoords.lat.toFixed(4)) : 16.0,
                    lng: pCoords ? parseFloat(pCoords.lng.toFixed(4)) : 108.0
                });
            }
            
            await sleep(1000); // 1-second delay between requests
        }

        // 3. Update DB
        await databaseService.provinces.updateOne(
            { _id: province._id },
            { 
                $set: { 
                    lat: pCoords ? parseFloat(pCoords.lat.toFixed(4)) : 16.0,
                    lng: pCoords ? parseFloat(pCoords.lng.toFixed(4)) : 108.0,
                    campus_data: campusData 
                } 
            }
        );
        totalUpdated++;
    }

    console.log(`\nMigration Completed! Updated ${totalUpdated} provinces.`);
    process.exit(0);
}

startProfessionalMigration();
