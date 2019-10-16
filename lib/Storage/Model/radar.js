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
                return new Promise((resolve, reject) => {
                    const filtered = dataIndex.filter(i => i.id === id)[0];
                    if (filtered) {
                        resolve(filtered);
                    } else {
                        reject(false);
                    }
                })
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
                        .write(writeData)
                        .then(writtenRadar => {
                            resolve(writtenRadar);
                        })
                        .catch(() => {
                            reject('shit happens');
                        });
                });
        });
    }

    write(radar) {
        return new Promise((resolve, reject) => {
            const folderPath = `${this.storage.path}/${radar.id}`;
            const datasetPath = `${this.storage.path}/${radar.id}/dataset`;
            const configPath = `${folderPath}/config.json`;
            this.storage.createFolder(folderPath);
            this.storage.createFolder(datasetPath);
            this.storage.write(configPath, radar);
            resolve(radar);
        });
    }

    update(id, formData) {
        return new Promise((resolve, reject) => {
            let writeData = {};
            if (formData.label) {
                writeData = {
                    id: slugify(formData.label, {replacement: '_', lower: true}),
                    ...formData
                    // ...
                };
            } else {
                writeData = {
                    id: id,
                    ...formData
                    // ...
                };
            }

            if (id !== writeData.id) {
                this
                    .one(writeData.id)
                    .then(existingRadar => {
                        reject(`Radar with new label exists ${existingRadar.id}`);
                    })
                    .catch(() => {
                        const fromPath = `${this.storage.path}/${id}`;
                        const toPath = `${this.storage.path}/${writeData.id}`;
                        fs.moveSync(fromPath, toPath);

                        this
                            .write(writeData)
                            .then(writtenRadar => {
                                resolve(writtenRadar);
                            })
                            .catch(() => {
                                reject('shit happens');
                            });
                    });
            } else {
                this
                    .one(id)                    // check if one exists
                    .then(existingRadar => {    // if one exists, resolve here, if if no write error happens

                        // fill missing fields with the existing one
                        writeData = R.mergeDeepLeft(writeData, existingRadar);
                        [0, 1, 2, 3].forEach(i => {
                            if (!writeData.quadrants[i])
                                writeData.quadrants[i] = R.merge(existingRadar.quadrants[i], writeData.quadrants[i]);
                            writeData.rings[i] = R.merge(existingRadar.rings[i], writeData.rings[i]);
                        });
                        delete (writeData.path);

                        this
                            .write(writeData)
                            .then(writtenRadar => {
                                resolve(writtenRadar);
                            })
                            .catch(() => {
                                reject('shit happens');
                            });
                    });
            }
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this
                .one(id)  // check if one exists
                .then(existingRadar => {
                    const deletePath = `${this.storage.path}/${id}`;
                    this.storage.delete(deletePath);
                    resolve(existingRadar);
                })
                .catch(() => {
                    reject('Radar not exists');
                });

        });
    }
};