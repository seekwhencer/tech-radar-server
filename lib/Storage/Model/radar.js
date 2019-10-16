import fs from 'fs-extra';
import slugify from 'slugify';
import Model from '../Model.js';

export default class extends Model {
    constructor(storage) {
        super(storage);
        this.label = 'MODEL RADAR';
        LOG(this.label, 'INIT');
    }

    getIndex() {
        return this
            .getIndexFolders()
            .then(indexFolders => {
                return this.getDataSets(indexFolders);
            })
            .then(dataIndex => {
                dataIndex = dataIndex.map(i => {
                    delete (i.path);
                    return i;
                });
                return dataIndex;
            });
    }

    getIndexFolders() {
        return new Promise((resolve, reject) => {
            const dataSetFolders = RDIRSYNC(this.storage.path, false, [], true);
            resolve(dataSetFolders);
        });
    }

    getDataSets(indexFolders) {
        return new Promise((resolve, reject) => {
            indexFolders.forEach((folder, i) => {
                this
                    .getItem(folder)
                    .then(item => {
                        indexFolders[i] = {
                            ...indexFolders[i],
                            ...item
                        }
                    });
            });
            resolve(indexFolders);
        });
    }

    getItem(folder) {
        const config = fs.readJSONSync(`${folder.path}/config.json`);
        return this.storage.dataset
            .getIndex(folder)
            .then(versions => {
                config.versions = versions.map(i => i.id);
                return config;
            });
    }

    one(id) {
        return this
            .getIndex()
            .then(dataIndex => {
                return dataIndex.filter(i => i.id === id)[0];
            });
    }

    create(formData) {
        return new Promise((resolve, reject) => {
            if (!formData.label) {
                reject('No Label');
                return;
            }

            const writeData = {
                id: slugify(formData.label, {replacement: '_', lower: true}),
                ...formData
                // ...
            };

            this
                .one(writeData.id)  // check if one exists
                .then(radar => {    // if one exists, reject here
                    reject(`${radar.label || radar.id} exists`);
                })
                .catch(() => {      // if none exists, resolve here, if if no write error happens
                    this
                        .addNew(writeData)
                        .then(writtenRadar => {
                            resolve(writtenRadar);
                        })
                        .catch(() => {
                            reject('shit happens');
                        });
                });
        });
    }

    addNew(radar) {
        return new Promise((resolve, reject) => {
            const folderPath = `${STORAGE.path}/${radar.id}`;
            const datasetPath = `${STORAGE.path}/${radar.id}/dataset`;
            const configPath = `${folderPath}/config.json`;
            STORAGE.createFolder(folderPath);
            STORAGE.createFolder(datasetPath);
            STORAGE.create(configPath, radar);
            resolve(radar);
        });
    }
};