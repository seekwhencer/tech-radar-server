import * as Configs from '../config/index.js';

export default class AppConfig {

    constructor(args){
        this.name = 'appconfig';
        this.label = 'APPCONFIG';
        this.data = {};
        this.keys = [];

        LOG(this.label, 'INIT');

        this.configs = Configs;
        return this.configs[ENV];
    }

    set(key, value) {
        if (typeof key === 'string' && value) {
            this.data[key] = value;
            this.keys.push(key);
        }
        if (typeof key === 'object' && !value) {
            this.setAll(key);
        }
        return true;
    }

    setAll(data) {
        for (let c in data) {
            this.set(c, data[c]);
        }
        return true;
    }

    get(key) {
        if (key) {
            return this.data[key];
        } else {
            return this.getAll();
        }
    }

    getAll() {
        let conf = {};
        for (let k in this.keys) {
            conf[this.keys[k]] = this.get(this.keys[k]);
        }
        return conf;
    }
};
