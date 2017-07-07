"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiai = require("apiai");
const fs = require("fs");
const uuid = require("uuid/v1");
let file = '../../Connections.json';
let token = "";
var app;
if (fs.existsSync(file)) {
    var text = fs.readFileSync(file);
    token = JSON.parse(text).assistant_client_token;
    app = apiai(token);
}
const id = uuid();
const altOptions = {
    sessionId: id
};
class BaseAssistant {
    constructor(client_id) {
        if (client_id != null)
            app = apiai(client_id);
    }
    textRequest(query, options) {
        if (!options)
            options = altOptions;
        return app.textRequest(query, options);
    }
    eventRequest(event, options) {
        return app.eventRequest(event, options);
    }
    contextsRequest(contexts, options) {
        return app.contextsRequest(contexts, options);
    }
    deleteContextsRequest(options) {
        return app.deleteContextsRequest(options);
    }
    userEntitiesRequest(user_entities_body, options) {
        return app.userEntitiesRequest(user_entities_body, options);
    }
}
exports.BaseAssistant = BaseAssistant;
//# sourceMappingURL=BaseAssistant.js.map