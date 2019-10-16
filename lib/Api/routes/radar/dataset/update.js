import RouteSet from '../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.post('/:radar/dataset/:dataset/update', (req, res) => {
            const datasetId = req.params.dataset;
            const radarId = req.params.radar;
            const name = req.fields.name;
            const radarTo = req.fields.radar;

            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    STORAGE.dataset
                        .update(datasetId, name, radar, radarTo)
                        .then(dataset => {
                            this.success(req, res, dataset);
                        })
                        .catch(error => {
                            this.error(req, res, error, 'Dataset update failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Dataset update failed');
                });
        });

        return this.router;
    }
};