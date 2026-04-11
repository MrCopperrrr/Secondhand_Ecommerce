import api from './api';

export const commonServices = {
    getProvinces: () => {
        return api.get('/common/provinces');
    },
    getFilterOptions: () => {
        return api.get('/common/filter-options');
    }
};
