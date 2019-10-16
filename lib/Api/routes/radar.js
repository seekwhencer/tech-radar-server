import RouteSet from '../RouteSet.js';
import * as Routes from './radar/index.js';

export default class extends RouteSet {
    constructor(args) {
        super(args);

        this.label = 'API STATUS';
        this.endpoint = 'radar';
        this.addRoutes(Routes);

        return this.router;
    }
};