import fs from 'fs-extra';
import Module from '../Module.js';
import * as Model from './Model/index.js';

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

    createFolder(folder) {
        if (!folder) {
            folder = this.path;
        }
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
    }

    create(path, data) {
        fs.writeJSONSync(path, data);
    }
};