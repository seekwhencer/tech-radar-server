import RouteSet from '../../RouteSet.js';
import Form from '../../lib/Form/radar.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.form = new Form();

        /**
         * create a new radar
         */
        this.router.post('/create', (req, res) => {
            const formData = this.form.parse(req.fields);
            STORAGE.radar
                .create(formData)
                .then(createData => {
                    this.success(req, res, createData, 'Created');
                })
                .catch(error => {
                    this.error(req, res, error, 'Create Failed');
                });
        });

        return this.router;
    }
};