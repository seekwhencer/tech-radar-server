import Form from '../Form.js';

export default class extends Form {
    constructor(reqFields) {
        super();

        this.singleFields = ['label', 'theme'];
        this.arrayFields = {
            seed: ['from', 'to'],
            quadrants: [0,1,2,3],
            rings:[0,1,2,3]
        };

        if(reqFields)
            this.parse(reqFields);
    }
};
