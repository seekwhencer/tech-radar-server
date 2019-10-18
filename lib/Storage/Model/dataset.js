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
        radar.path = `${STORAGE.path}/${radar.id}`;
        return new Promise((resolve, reject) => {
            const datasetFile = `${radar.path}/dataset/${name}.json`;
            if (!fs.existsSync(datasetFile)) {
                fs.writeJSONSync(datasetFile, []);
                resolve(name);
            } else {
                reject('Dataset exists');
            }
        });
    }

    delete(name, radar) {
        radar.path = `${STORAGE.path}/${radar.id}`;
        return new Promise((resolve, reject) => {
            const datasetFile = `${radar.path}/dataset/${name}.json`;
            if (fs.existsSync(datasetFile)) {
                fs.removeSync(datasetFile);
                resolve(name);
            } else {
                reject('Dataset not found');
            }
        });
    }

    update(fromName, toName, radar, toRadar) {
        radar.path = `${STORAGE.path}/${radar.id}`;
        return new Promise((resolve, reject) => {
            const fromFile = `${radar.path}/dataset/${fromName}.json`;

            if (!toName && !toRadar) {
                reject('No Name or Radar given');
                return;
            }

            if (!toName)
                toName = fromName;

            let toFile = `${radar.path}/dataset/${toName}.json`;

            if (toRadar) {
                const toRadarPath = `${STORAGE.path}/${toRadar}`;
                if (!fs.existsSync(toRadarPath)) {
                    reject('To Radar not exists');
                    return;
                }
                toFile = `${toRadarPath}/dataset/${toName}.json`;
            }

            if (fs.existsSync(toFile)) {
                reject('Renamed Dataset exists');
                return;
            }

            if (fs.existsSync(fromFile)) {
                fs.moveSync(fromFile, toFile);
                resolve(toName);
            } else {
                reject('Dataset not found');
            }
        });
    }
};