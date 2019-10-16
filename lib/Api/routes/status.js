import RouteSet from '../RouteSet.js';
import * as Routes from './status/index.js';

export default class extends RouteSet {
    constructor(args) {
        super(args);

        this.label = 'API STATUS';
        this.endpoint = 'status';
        this.addRoutes(Routes);

        return this.router;
    }
};