import RouteSet from '../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.post('/:radar/dataset/:dataset/delete', (req, res) => {
            const datasetId = req.params.dataset;
            const radarId = req.params.radar;

            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    STORAGE.dataset
                        .delete(datasetId, radar)
                        .then(dataset => {
                            this.success(req, res, dataset);
                        })
                        .catch(error => {
                            this.error(req, res, error, 'Dataset delete failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Dataset delete failed');
                });
        });

        return this.router;
    }
};