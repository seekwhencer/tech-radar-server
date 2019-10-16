import Model from '../Model.js';

export default class extends Model {
    constructor(storage) {
        super(storage);
        this.label = 'MODEL DATASET';
        LOG(this.label, 'INIT');
    }

    getIndex(radar) {
        return new Promise((resolve, reject) => {
            const versions = RDIRSYNC(`${radar.path}/dataset`, false, ['json'], false);
            resolve(versions);
        });
    }
};