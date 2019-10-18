import RouteSet from '../../../../RouteSet.js';
import Form from '../../../../lib/Form/dot.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.form = new Form();

        this.router.post('/:radar/dataset/:dataset/dot/:dot/update', (req, res) => {
            const fromRadarId = req.params.radar;
            const fromDatasetId = req.params.dataset;
            const fromDotLabel = req.params.dot;
            const formData = this.form.parse(req.fields);

            const options = {
                fromRadarId,
                fromDatasetId,
                fromDotLabel,
                formData
            };

            STORAGE.radar
                .getIndex()
                .then(dataIndex => {
                    return STORAGE.dot.update({...options, dataIndex});
                })
                .then(updated => {
                    this.success(req, res, updated, 'Dot updated');
                })
                .catch(error => {
                    this.error(req, res, error, 'Dot update failed');
                });
        });

        return this.router;
    }
};