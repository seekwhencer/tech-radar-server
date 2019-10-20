import RouteSet from '../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        /**
         * get all
         */
        this.router.get('/', (req, res) => {
            STORAGE.radar.getIndex().then(dataIndex => {
                const filtered = dataIndex.map(i => {
                   return {
                       id : i.id,
                       label : i.label,
                       is_default: i.is_default,
                       version: i.version,
                       versions: i.versions
                   }
                });
                this.success(req, res, filtered);
            });
        });

        /**
         * get one
         */
        this.router.get('/:radar', (req, res) => {
            const radarId = req.params.radar;
            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    this.success(req, res, radar);
                })
                .catch(error => {
                    this.error(req, res, error, 'Get failed');
                });
        });

        return this.router;
    }
};