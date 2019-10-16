import RouteSet from '../../RouteSet.js';
import Form from '../../lib/Form/radar.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.form = new Form();

        /**
         * update a radar
         */
        this.router.post('/:radar/update', (req, res) => {
            const formData = this.form.parse(req.fields);
            const id = req.params.radar;
            STORAGE.radar
                .update(id, formData)
                .then(updateData => {
                    LOG('RADAR UPDATED.', updateData.label);
                    this.success(req, res, updateData, 'Updated');
                })
                .catch(error => {
                    this.error(req, res, error, 'Update Failed');
                });
        });

        return this.router;
    }
};