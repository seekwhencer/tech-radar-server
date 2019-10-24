import RouteSet from '../../RouteSet.js'

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/export', (req, res) => {
            STORAGE.export().then(() => {
                res.download(`${APP_DIR}/export.zip`,'tech-radar-data.zip');
            });
        });

        return this.router;
    }
};