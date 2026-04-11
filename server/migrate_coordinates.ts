import databaseService from "./src/services/database.services.js";

async function migrateProvinces() {
    await databaseService.connect();
    
    // Major coordinate mapping for provinces/campuses
    const provinceCoords: Record<string, {lat: number, lng: number}> = {
        "Thành phố Hà Nội": { lat: 21.0285, lng: 105.8542 },
        "Thành phố Hồ Chí Minh": { lat: 10.8231, lng: 106.6297 },
        "Thành phố Hải Phòng": { lat: 20.8449, lng: 106.6881 },
        "Thành phố Đà Nẵng": { lat: 16.0544, lng: 108.2022 },
        "Tỉnh Hải Dương": { lat: 20.9400, lng: 106.3333 },
        "Tỉnh Tuyên Quang": { lat: 21.8239, lng: 105.2100 },
        "Tỉnh Lào Cai": { lat: 22.4833, lng: 103.9667 },
        "Tỉnh Thái Nguyên": { lat: 21.5936, lng: 105.8139 },
        "Tỉnh Phú Thọ": { lat: 21.3216, lng: 105.4019 },
        "Tỉnh Bắc Ninh": { lat: 21.1861, lng: 106.0763 }
    };

    const campusCoords: Record<string, {lat: number, lng: number}> = {
        "Trường Đại học Hàng hải": { lat: 20.8448, lng: 106.6874 },
        "Trường Đại học Hải Phòng": { lat: 20.8066, lng: 106.6272 },
        "Trường Đại học Y Dược Hải Phòng": { lat: 20.8528, lng: 106.6975 },
        "Trường Đại học Sao Đỏ": { lat: 21.0772, lng: 106.3986 },
        "Trường Đại học Hải Dương": { lat: 20.9254, lng: 106.3056 },
        "Trường Đại học Tân Trào": { lat: 21.8239, lng: 105.2100 },
        "Phân hiệu Đại học Thái Nguyên tại Lào Cai": { lat: 22.4833, lng: 103.9667 },
        "Đại học Thái Nguyên": { lat: 21.5936, lng: 105.8139 },
        "Trường Đại học Bách Khoa Hà Nội": { lat: 21.0073, lng: 105.8429 },
        "Trường Đại học Bách Khoa TP.HCM": { lat: 10.7735, lng: 106.6602 }
    };

    const provinces = await databaseService.provinces.find({}).toArray();

    for (const province of provinces) {
        const pCoords = provinceCoords[province.name] || { lat: 16.0, lng: 108.0 }; // Default central VN
        const campusList = province.campus || [];
        
        // Transform campus into an array of objects with coordinates
        const updatedCampus = campusList.map((name: string) => {
            const coords = campusCoords[name] || pCoords; // Fallback to province coords
            return {
                name,
                lat: coords.lat,
                lng: coords.lng
            };
        });

        await databaseService.provinces.updateOne(
            { _id: province._id },
            { 
                $set: { 
                    lat: pCoords.lat, 
                    lng: pCoords.lng,
                    campus_data: updatedCampus 
                } 
            }
        );
    }

    console.log("Migration completed successfully!");
    process.exit(0);
}

migrateProvinces();
