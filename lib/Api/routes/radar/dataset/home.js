import RouteSet from '../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/:radar/dataset', (req, res) => {
            const radarId = req.params.radar;
            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    this.success(req, res, radar.versions);
                })
                .catch(error => {
                    this.error(req, res, error, 'Get failed');
                });
        });

        this.router.get('/:radar/dataset/:dataset', (req, res) => {
            const datasetId = req.params.dataset;
            const radarId = req.params.radar;

            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    STORAGE.dataset
                        .one(datasetId, radar)
                        .then(dataset => {
                            this.success(req, res, dataset);
                        })
                        .catch(error => {
                            this.error(req, res, error, 'Get failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Get failed');
                });
        });

        return this.router;
    }
};