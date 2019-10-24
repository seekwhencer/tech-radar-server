import fs from 'fs-extra';
import Module from '../Module.js';
import * as Model from './Model/index.js';
import archiver from 'archiver';

export default class extends Module {
    constructor() {
        super();
        return new Promise((resolve, reject) => {
            this.label = 'STORAGE';
            LOG(this.label, 'INIT');

            this.path = `${APP_DIR}/storage`;

            // create the json models
            ['radar', 'dataset', 'dot'].forEach(i => {
                this[i] = new Model[i](this);
            });

            resolve(this);
        });
    }

    export(){
        return new Promise((resolve,reject) => {
            const outputFile = `${APP_DIR}/export.zip`;
            const output = fs.createWriteStream(outputFile);
            output.on('close', () => {
                resolve({
                    bytes: archive.pointer()
                });
            });

            const archive = archiver('zip', {
                zlib: { level: 9 }
            });
            archive.on('error', (err) => {
                reject(err);
            });

            archive.pipe(output);
            archive.directory(this.path, false);
            archive.finalize();
        });
    }

    createFolder(folder) {
        if (!folder) {
            folder = this.path;
        }
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    write(path, data) {
        fs.writeJSONSync(path, data);
    }

    update(path, data) {
        this.write(path, data);
    }

    delete(deletePath){
        fs.removeSync(deletePath);
    }
};