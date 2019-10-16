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
        return STORAGE.radar.getIndex().then(dataIndex => {
            return dataIndex.filter(i => i.id === id)[0];
        });
    }

    create(formData) {
        LOG(this.label, 'CREATE', formData);
        return new Promise((resolve, reject) => {
            if (!formData.label) {
                reject('No Label');
                return;
            }

            const writeData = {
                id: slugify(formData.label, {replacement: '_', lower: true}),
                label: formData.label,
                theme: formData.theme
            };

            this
                .one(writeData.id)
                .then(radar => {
                    reject(`${radar.label || radar.id} exists`);
                })
                .catch(() => {
                    resolve(writeData);
                });
        });
    }
};