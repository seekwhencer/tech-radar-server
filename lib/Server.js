import Module from './Module.js';
import Api from './Api/index.js';

export default class extends Module {
    constructor(args) {
        super(args);
        return new Promise((resolve, reject) => {
            this.label = 'SERVER';
            LOG(this.label, 'INIT');

            this.on('ready', () => {
                resolve(this);
            });

            new Api().then(api=> {
                this.api = api;
                this.emit('ready');
            });

        });
    }
}