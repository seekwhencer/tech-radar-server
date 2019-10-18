import RouteSet from '../../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/:radar/dataset/:dataset/dot', (req, res) => {
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
                            this.error(req, res, error, 'Dataset get failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Dataset get failed');
                });
        });

        this.router.get('/:radar/dataset/:dataset/dot/:dot', (req, res) => {
            const dotLabel = req.params.dot;
            const datasetId = req.params.dataset;
            const radarId = req.params.radar;

            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    STORAGE.dataset
                        .one(datasetId, radar)
                        .then(dataset => {
                            const dot = dataset.filter(i => i.label === dotLabel)[0];
                            if(dot){
                                this.success(req, res, dot);
                            } else {
                                this.error(req, res, 'Not Found', 'Dataset get failed');
                            }
                        })
                        .catch(error => {
                            this.error(req, res, error, 'Dataset get failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Dataset get failed');
                });
        });

        return this.router;
    }
};