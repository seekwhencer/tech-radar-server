import RouteSet from '../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/:radar/dataset', (req, res) => {
            const radar = req.params.radar;

            const message = 'DATASET';
            const payload = {
                radar:radar
            };

            this.success(req, res, message, payload);
        });

        this.router.get('/:radar/dataset/:dataset', (req, res) => {
            const id = req.params.dataset;
            const radar = req.params.radar;

            const message = 'DATASET';
            const payload = {
                id: id,
                radar:radar
            };

            this.success(req, res, message, payload);
        });

        return this.router;
    }
};