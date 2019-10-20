import RouteSet from '../../../RouteSet.js';

export default class extends RouteSet {
    constructor() {
        super();

        this.router.post('/:radar/dataset/create', (req, res) => {
            const radarId = req.params.radar;
            const name = req.fields.name;
            STORAGE.radar
                .one(radarId)
                .then(radar => {
                    radar.path = `${STORAGE.path}/${radar.id}`;
                    STORAGE.dataset
                        .create(name, radar)
                        .then(createdVersion => {
                            this.success(req, res, createdVersion, 'Created');
                        })
                        .catch(error => {
                            this.error(req, res, error, 'Dataset create failed');
                        });
                })
                .catch(error => {
                    this.error(req, res, error, 'Dataset create failed');
                });
        });

        return this.router;
    }
};