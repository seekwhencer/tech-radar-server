import http from 'http';
import bodyParser from 'body-parser';
import formidable from 'express-formidable';

import Module from '../Module.js';
import Auth from './Auth.js';

import * as Routes from './routes/index.js';
import RouteSet from './RouteSet.js';

export default class Api extends Module {

    constructor(args) {
        super(args);

        return new Promise((resolve, reject) => {
                this.name = 'api';
                this.label = 'API';

                this.http = null;

                this.mergeOptions();
                LOG(this.label, 'INIT');

                this.on('ready', () => {
                    LOG(this.label, '>>> READY ON PORT', this.port);
                    LOG('');
                    resolve(this);
                });

                //APIAPP.use(bodyParser.json());
                APIAPP.use(bodyParser.urlencoded({extended: true}));
                APIAPP.use(formidable());

                // @TODO - this is for development.
                APIAPP.use((req, res, next) => {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Credentials", "true");
                    res.header("Access-Control-Allow-Methods", "GET,POST");
                    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                    next();
                });

                // json web token auth
                this.auth = new Auth(this.options.auth);

                // add the api routes
                APIAPP.endpoints = {};
                APIAPP.routeset = {};
                this.routes = new RouteSet();
                this.routes.addRoutes(Routes);

                LOG(this.label, 'ROUTES ADDED:');
                Object.keys(APIAPP.endpoints).forEach(method => {
                    LOG('');
                    LOG(this.label, '> METHOD:', method);
                    APIAPP.endpoints[method].forEach(r => {
                        LOG(this.label, 'ROUTE:', r);
                    });
                });
                LOG('');

                //Object.keys(APIAPP.routeset).forEach(r => {
                //    LOG(this.label, '> :', r, APIAPP.routeset[r].length);
                //});
                //LOG('');

                // fontend
                this.useFrontend();

                this.http = http.createServer(APIAPP);
                this.http.listen(this.port, () => {
                    this.emit('ready');
                });
            }
        );
    };

    mergeOptions() {
        super.mergeOptions();
        this.host = this.options.host;
        this.port = this.options.port;
    };

    useFrontend(){
        // whitelist for folders
        APIAPP.use('/', EXPRESS.static(`${APP_DIR}/public`));
        ['css','js','images','radar'].forEach(i => APIAPP.use(`/${i}`, EXPRESS.static(`${APP_DIR}/node_modules/neo-tech-radar/dist/prod/${i}`)));
    }

    shutdown() {
        this.http.close(() => {
            LOG(this.label, 'CLOSED');
        });
    };

};