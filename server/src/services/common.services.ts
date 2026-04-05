import databaseService from "./database.services.js";

class CommonService {
    async getProvinces() {
        const result = await databaseService.provinces.find({}).toArray();
        return result;
    }
}

const commonService = new CommonService();
export default commonService;
