import './lib/Globals.js';
import Storage from './lib/Storage/index.js';
import Server from './lib/Server.js';

new Storage().then(storage => {
    global.STORAGE = storage;
    return new Server();
}).then(server => {
    global.SERVER = server;
});
