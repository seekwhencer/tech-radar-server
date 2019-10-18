import Model from '../Model.js';
import fs from "fs-extra";

export default class extends Model {
    constructor(storage) {
        super(storage);
        this.label = 'MODEL DOT';
        LOG(this.label, 'INIT');
    }

    create(options) {
        return new Promise((resolve, reject) => {
            if (Object.keys(options.formData).length === 0) {
                reject('No data given');
                return;
            }
            const toRadarId = options.formData.radar || options.toRadarId;
            const toRadar = options.dataIndex.filter(i => i.id === toRadarId)[0];
            if (!toRadar) {
                reject('Target Radar not exists');
                return;
            }
            const toDatasetId = options.formData.version || options.toDatasetId;
            const toDataset = toRadar.versions.filter(i => i === toDatasetId)[0];
            if (!toDataset) {
                reject('Target Dataset not exists');
                return;
            }
            const existingDot = this.oneSync(toRadar, toDataset, options.formData.label);
            if (existingDot) {
                reject('Dot exists');
                return;
            }
            this.createSync(toRadar, toDataset, options.formData);
            resolve(options.formData);
        });
    }

    update(options) {
        return new Promise((resolve, reject) => {
            if (Object.keys(options.formData).length === 0) {
                reject('No data given');
                return;
            }
            const fromRadarId = options.fromRadarId;
            const fromRadar = options.dataIndex.filter(i => i.id === fromRadarId)[0];
            if (!fromRadar) {
                reject('From Radar not exists');
                return;
            }
            const fromDatasetId = options.fromDatasetId;
            const fromDataset = fromRadar.versions.filter(i => i === fromDatasetId)[0];
            if (!fromDataset) {
                reject('From Dataset not exists');
                return;
            }
            const toRadarId = options.formData.radar || fromRadarId;
            const toRadar = options.dataIndex.filter(i => i.id === toRadarId)[0];
            if (!toRadar) {
                reject('Target Radar not exists');
                return;
            }
            const toDatasetId = options.formData.version || fromDatasetId;
            const toDataset = toRadar.versions.filter(i => i === toDatasetId)[0];
            if (!toDataset) {
                reject('Target Dataset not exists');
                return;
            }

            const dot = this.oneSync(fromRadar, fromDataset, options.fromDotLabel);

            if (!dot) {
                reject('Dot not exists');
                return;
            }

            const updatedDot = R.mergeDeepLeft(options.formData, dot);
            const existingDot = this.oneSync(toRadar, toDataset, updatedDot.label);

            if (existingDot) {
                reject('Target Dot exists');
                return;
            }

            this.deleteSync(fromRadar, fromDataset, options.fromDotLabel);
            this.createSync(toRadar, toDataset, updatedDot);
            resolve(updatedDot);
        });
    }

    delete(options) {
        return new Promise((resolve, reject) => {
            const fromRadar = options.dataIndex.filter(i => i.id === options.fromRadarId)[0];
            if (!fromRadar) {
                reject('Target Radar not exists');
                return;
            }
            const fromDataset = fromRadar.versions.filter(i => i === options.fromDatasetId)[0];
            if (!fromDataset) {
                reject('Target Dataset not exists');
                return;
            }

            const dot = this.oneSync(fromRadar, fromDataset, options.dotLabel);

            if (!dot) {
                reject('Dot not exists');
                return;
            }

            this.deleteSync(fromRadar, fromDataset, dot.label);
            resolve(dot);
        });
    }

    createSync(radar, datasetId, dot) {
        const radarPath = `${STORAGE.path}/${radar.id}`;
        const datasetPath = `${radarPath}/dataset/${datasetId}.json`;
        const dataset = fs.readJSONSync(datasetPath);
        const added = dataset.concat(dot);
        fs.writeJSONSync(datasetPath, added);
        return added;
    }

    deleteSync(radar, datasetId, dotLabel) {
        const radarPath = `${STORAGE.path}/${radar.id}`;
        const datasetPath = `${radarPath}/dataset/${datasetId}.json`;
        const dataset = fs.readJSONSync(datasetPath);
        const filtered = dataset.filter(i => i.label !== dotLabel);
        fs.writeJSONSync(datasetPath, filtered);
        return filtered;
    }

    oneSync(radar, datasetId, dotLabel) {
        const radarPath = `${STORAGE.path}/${radar.id}`;
        const datasetPath = `${radarPath}/dataset/${datasetId}.json`;
        const dataset = fs.readJSONSync(datasetPath);
        return dataset.filter(i => i.label === dotLabel)[0];
    }
};