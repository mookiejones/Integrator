

'use_strict';

import { Assistant } from './Assistant';


let assistant = new Assistant();

var request=assistant.textRequest("How are you today?");
request.on('response', function(response) {
    console.log(response);
});

request.on('error', function(error) {
    console.log(error);
});

request.end();