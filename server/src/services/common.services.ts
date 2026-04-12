import databaseService from "./database.services.js";

class CommonService {
    async getProvinces() {
        const result = await databaseService.provinces.find({}).toArray();
        return result;
    }

    async getFilterOptions() {
        // Master list from provinces collection (contains all provinces, campuses, and wards)
        const masterProvinces = await databaseService.provinces.find({}).sort({ name: 1 }).toArray();
        const provinces = masterProvinces.map(p => ({ id: p.name, label: p.name }));
        
        let allCampuses: string[] = [];
        let allWards: string[] = [];

        masterProvinces.forEach(p => {
            if (p.campus) allCampuses = [...allCampuses, ...p.campus];
            if (p.wards) allWards = [...allWards, ...p.wards];
        });

        // Global unique lists for when no province is selected
        const campuses = Array.from(new Set(allCampuses)).sort().map(c => ({ id: c, label: c }));
        const uniqueWards = Array.from(new Set(allWards)).sort();
        const wards = uniqueWards.map(w => ({ id: w, label: w }));

        return { 
            provinces, 
            wards, 
            campuses,
            masterData: masterProvinces.map(p => ({
                id: p.name,
                name: p.name,
                campuses: p.campus || [],
                wards: p.wards || []
            }))
        };
    }
}

const commonService = new CommonService();
export default commonService;
