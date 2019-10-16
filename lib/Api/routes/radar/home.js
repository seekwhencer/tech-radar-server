import RouteSet from '../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        /**
         * get all
         */
        this.router.get('/', (req, res) => {
            STORAGE.radar.getIndex().then(dataIndex => {
                this.success(req, res, dataIndex);
            });
        });

        /**
         * get one
         */
        this.router.get('/:radar', (req, res) => {
            const id = req.params.radar;
            STORAGE.radar.getIndex().then(dataIndex => {
                dataIndex = dataIndex.filter(i => i.id === id);
                this.success(req, res, dataIndex);
            });
        });

        return this.router;
    }
};