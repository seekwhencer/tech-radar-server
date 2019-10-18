import Form from '../Form.js';

export default class extends Form {
    constructor(reqFields) {
        super();

        this.singleFields = ['radar', 'version', 'quadrant', 'ring', 'label', 'active', 'moved', 'boost'];
        this.arrayFields = {};

        if (reqFields)
            this.parse(reqFields);
    }

    parse(reqFields) {
        super.parse(reqFields);
        return this.fieldData;
    }
};
