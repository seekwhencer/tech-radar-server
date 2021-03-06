import './Utils.js';
import path from 'path';
import * as R from './Ramda.js';

import * as Express from 'express';
import Log from './Log.js';
import Config from './Config.js';
import Package from '../package.json';

/**
 * Defining some global things here:
 */
global.DEBUG = process.env.NODE_DEBUG || true;
if (DEBUG === 'true') global.DEBUG = true;
if (DEBUG === 'false') global.DEBUG = false;

global.LOG = new Log().log;

/**
 * global process events
 */
process.on('uncaughtException', (error) => {
    LOG('ERROR:', error);
});
process.on('SIGINT', function () {

    // some graceful exit code
    setTimeout(function () {
        process.exit(0);
    }, 2000);
});
process.stdin.resume();

/**
 * mapping global things
 */
global.APP_DIR = path.resolve(process.env.PWD);
process.env.NODE_CONFIG_ENV = process.env.NODE_ENV;
process.env.SUPPRESS_NO_CONFIG_WARNING = true;

global.PACKAGE = Package;
global.ENV = process.env.NODE_ENV || 'default';
global.CONFIG = new Config();
process.env.NODE_PORT ? CONFIG.api.port = parseInt(process.env.NODE_PORT) : CONFIG.api.port;
process.env.NODE_USER ? CONFIG.api.auth.username = process.env.NODE_USER : CONFIG.api.auth.username;
process.env.NODE_PASS ? CONFIG.api.auth.password = process.env.NODE_PASS : CONFIG.api.auth.password;

global.R = R;
global.EXPRESS = Express.default;
global.APIAPP = EXPRESS();


LOG('//////////////////');
LOG('RUNNING:', PACKAGE.name);
LOG('VERSION:', PACKAGE.version);
LOG('ENVIRONMENT:', ENV);
LOG('/////////');
LOG('');

export default class {
    constructor() {
        this.ENV = ENV;
        this.APP_DIR = APP_DIR;
        this.PACKAGE = PACKAGE;
        this.CONFIG = CONFIG;
        this.LOG = LOG;
        this.DEBUG = DEBUG;
        this.R = R;
        this.EXPRESS = EXPRESS;
        this.APIAPP = APIAPP;
    }
}