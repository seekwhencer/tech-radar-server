import RouteSet from '../../../RouteSet.js';
import * as Routes from './dot/index.js';

export default class extends RouteSet {
    constructor(args) {
        super(args);

        this.label = 'API DOT';
        this.endpoint = false;
        this.addRoutes(Routes, this);  /// <--- this is important, and the endpoint too

        return this.router;
    }
};