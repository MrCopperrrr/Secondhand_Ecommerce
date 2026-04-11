import databaseService from "./database.services.js";

class CommonService {
    async getProvinces() {
        const result = await databaseService.provinces.find({}).toArray();
        return result;
    }

    async getFilterOptions() {
        // Master list from provinces collection (contains all provinces and campuses)
        const masterProvinces = await databaseService.provinces.find({}).sort({ name: 1 }).toArray();
        
        const provinces = masterProvinces.map(p => ({ id: p.name, label: p.name }));
        
        let allCampuses: string[] = [];
        masterProvinces.forEach(p => {
            if (p.campus) allCampuses = [...allCampuses, ...p.campus];
        });
        const campuses = Array.from(new Set(allCampuses)).sort().map(c => ({ id: c, label: c }));

        // Combine mock wards from UI and existing ones in DB for a rich list
        const mockWards = [
            'Phường Diên Hồng', 'Phường Bến Nghé', 'Phường Đa Kao', 'Phường Tân Định',
            'Phường Hoàn Kiếm', 'Phường Bát Tràng', 'Phường Láng Hạ', 'Phường Đống Đa',
            'Phường Hòa Cường', 'Phường Tây Thạnh', 'Phường Mỹ Khê', 'Phường Hải Châu',
            'Phường Cái Khế', 'Phường Tân An', 'Phường Xuân Khánh', 'Phường Hưng Lợi',
            'Phường Minh Khai', 'Phường Quán Toan', 'Phường Hòn Gai', 'Phường Đông Hải'
        ];
        
        const existingAddressWards = await databaseService.address.distinct('address_line_2');
        const uniqueWards = Array.from(new Set([...mockWards, ...existingAddressWards])).filter(Boolean).sort();
        const wards = uniqueWards.map(w => ({ id: w, label: w }));

        return { provinces, wards, campuses };
    }
}

const commonService = new CommonService();
export default commonService;
