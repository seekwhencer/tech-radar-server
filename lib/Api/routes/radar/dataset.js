import RouteSet from '../../RouteSet.js';
import * as Routes from './dataset/index.js';

export default class extends RouteSet {
    constructor(args) {
        super(args);

        this.label = 'API DATASET';
        this.endpoint = false;
        this.addRoutes(Routes, this); /// <--- this is important, and the endpoint too

        return this.router;
    }
};