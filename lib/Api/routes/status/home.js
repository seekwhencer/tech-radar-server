import RouteSet from '../../RouteSet.js'

export default class extends RouteSet {
    constructor() {
        super();

        this.router.get('/', (req, res) => {
            //const id = req.params.;
            const message = 'Whooaaa';
            const data = {
                none: 'nischt'
            };

            this.success(req, res, message, data);
        });

        return this.router;
    }
};