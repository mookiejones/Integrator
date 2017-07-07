'use_strict';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assistant_1 = require("./Assistant");
let assistant = new Assistant_1.Assistant();
var request = assistant.textRequest("How are you today?");
request.on('response', function (response) {
    console.log(response);
});
request.on('error', function (error) {
    console.log(error);
});
request.end();
//# sourceMappingURL=test.js.map