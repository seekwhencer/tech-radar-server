export default class {
    constructor() {
        this.fieldData = {};
    }

    /**
     *
     *
     * @param reqFields - from req.fields
     * @returns {*}
     */
    parse(reqFields) {
        this.fieldData = {};
        this.singleFields.forEach(i => {
            if (reqFields[i]) {
                this.fieldData[i] = reqFields[i];
            }
            if (this.fieldData[i] === 'no' || this.fieldData[i] === 'false')
                this.fieldData[i] = false;

            if (this.fieldData[i] === 'yes' || this.fieldData[i] === 'true')
                this.fieldData[i] = true;

        });

        Object.keys(this.arrayFields).forEach(i => {
            this.fieldData[i] = {};
            this.arrayFields[i].forEach(ii => {
                if (reqFields[`${i}_${ii}`]) {
                    this.fieldData[i][ii] = reqFields[`${i}_${ii}`];
                }

                if (this.fieldData[i][ii] === 'no' || this.fieldData[i][ii] === 'false')
                    this.fieldData[i][ii] = false;

                if (this.fieldData[i][ii] === 'yes' || this.fieldData[i][ii] === 'false')
                    this.fieldData[i][ii] = true;

                if (parseInt(this.fieldData[i][ii]) > 0)
                    this.fieldData[i][ii] = parseInt(this.fieldData[i][ii]);

            });
            if (Object.keys(this.fieldData[i]).length === 0)
                delete(this.fieldData[i]);
        });

        return this.fieldData;
    }
}