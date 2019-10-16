import fs from 'fs-extra';
import Model from '../Model.js';

export default class extends Model {
    constructor(storage) {
        super(storage);
        this.label = 'MODEL DATASET';
        LOG(this.label, 'INIT');
    }

    getIndex(radar) {
        radar.path = `${STORAGE.path}/${radar.id}`;
        return new Promise((resolve, reject) => {
            const versions = RDIRSYNC(`${radar.path}/dataset`, false, ['json'], false);
            resolve(versions);
        });
    }

    one(version, radar) {
        return this
            .getIndex(radar)
            .then(dataIndex => {
                return new Promise((resolve, reject) => {
                    if (dataIndex.map(i => i.id).includes(version)) {
                        const datasetFile = dataIndex.filter(i => i.id === version)[0];
                        const dataset = fs.readJSONSync(datasetFile.file_path);
                        resolve(dataset);
                    } else {
                        reject('Dataset not found');
                    }
                })
            });
    }

    create(name, radar) {
        return new Promise((resolve, reject) => {
            const datasetFile = `${radar.path}/dataset/${name}.json`;
            if (!fs.pathExistsSync(datasetFile)) {
                fs.writeJSONSync(datasetFile, []);
                resolve(name);
            } else {
                reject('Dataset exists');
            }

        });
    }

};