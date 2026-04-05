import api from './api';

export const commonServices = {
    getProvinces: () => {
        return api.get('/common/provinces');
    }
};
