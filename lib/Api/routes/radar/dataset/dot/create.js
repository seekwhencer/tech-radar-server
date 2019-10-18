import RouteSet from '../../../../RouteSet.js';
import Form from '../../../../lib/Form/dot.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.form = new Form();

        this.router.post('/:radar/dataset/:dataset/dot/create', (req, res) => {
            const toRadarId = req.params.radar;
            const toDatasetId = req.params.dataset;
            const formData = this.form.parse(req.fields);

            const options = {
                toRadarId,
                toDatasetId,
                formData
            };

            STORAGE.radar
                .getIndex()
                .then(dataIndex => {
                    return STORAGE.dot.create({...options, dataIndex});
                })
                .then(updated => {
                    this.success(req, res, updated, 'Dot created');
                })
                .catch(error => {
                    this.error(req, res, error, 'Dot create failed');
                });
        });

        return this.router;
    }
};