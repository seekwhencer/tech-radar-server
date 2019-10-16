import RouteSet from '../../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/:radar/dataset/:dataset/dot', (req, res) => {
            const id = req.params.dot;
            const dataset = req.params.dataset;
            const radar = req.params.radar;
            const message = 'DOT';
            const payload = {
                id: id,
                dataset:dataset,
                radar:radar
            };

            this.success(req, res, message, payload);
        });

        this.router.get('/:radar/dataset/:dataset/dot/:dot', (req, res) => {
            const id = req.params.dot;
            const dataset = req.params.dataset;
            const radar = req.params.radar;

            const message = 'DOT';
            const payload = {
                id: id,
                dataset:dataset,
                radar:radar
            };

            this.success(req, res, message, payload);
        });

        return this.router;
    }
};