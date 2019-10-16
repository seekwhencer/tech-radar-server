import Form from '../Form.js';

export default class extends Form {
    constructor(reqFields) {
        super();

        this.singleFields = ['label', 'theme'];
        this.arrayFields = {
            seed: ['from', 'to'],

            quadrant0: ['label'],
            quadrant1: ['label'],
            quadrant2: ['label'],
            quadrant3: ['label'],

            ring0: ['label', 'color'],
            ring1: ['label', 'color'],
            ring2: ['label', 'color'],
            ring3: ['label', 'color'],

            dot: ['offset_x', 'offset_y'],
        };

        if (reqFields)
            this.parse(reqFields);
    }

    parse(reqFields) {
        super.parse(reqFields);
        this.fieldData.quadrants = [];
        this.fieldData.rings = [];
        [0, 1, 2, 3].forEach(i => {
            this.fieldData.quadrants[i] = this.fieldData[`quadrant${i}`];
            this.fieldData.rings[i] = this.fieldData[`ring${i}`];
            delete(this.fieldData[`quadrant${i}`]);
            delete(this.fieldData[`ring${i}`]);
        });
        return this.fieldData;
    }
};
