import Model from '../Model.js';

export default class extends Model {
    constructor(storage) {
        super(storage);
        this.label = 'MODEL DOT';
        LOG(this.label, 'INIT');
    }
};