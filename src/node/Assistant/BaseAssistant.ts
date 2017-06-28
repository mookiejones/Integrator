 

/* =================== USAGE ===================
    import * as apiai from "apiai";
    const app = apiai("YOUR_ACCESS_TOKEN");
 =============================================== */

import * as events from "events";
import * as stream from "stream";
import * as apiai from 'apiai'
import * as fs from 'fs';
import * as uuid from 'uuid/v1'
import {
    Event,
    EventRequest,
    EventRequestOptions,
    ContextsRequest,
    ContextsRequestOptions,
    DeleteContextsRequest,
    DeleteContextsRequestOptions,
    TextRequestOptions,
    TextRequest,
    UserEntitiesBody,
    UserEntitiesRequest,
    UserEntitiesRequestOptions
} from 'apiai';
 

let file = '../../Connections.json';
let token = "";
var app;
if (fs.existsSync(file)) {
    // Do something
    var text=fs.readFileSync(file);
    token = JSON.parse(text).assistant_client_token;
    app = apiai(token);
}
  
const id=uuid();
const altOptions = {
    sessionId:id
};
  
  


    /**
     * Application is factory for requests to api.ai service.
     */
    interface IAssistant {
        textRequest(query: string | [string],options:TextRequestOptions): TextRequest;
        eventRequest(event: Event, options: EventRequestOptions): EventRequest;
        contextsRequest(contexts: [any], options: ContextsRequestOptions): ContextsRequest;
        deleteContextsRequest(options: DeleteContextsRequestOptions): DeleteContextsRequest;
        userEntitiesRequest(user_entities_body: UserEntitiesBody, options?: UserEntitiesRequestOptions): UserEntitiesRequest;
        // Text to speech (TTS) has been deprecated
        //ttsRequest(text: string, options: TTSRequestOptions): TTSRequest;
    }
export class BaseAssistant implements IAssistant{

    constructor(client_id?:string){
        if(client_id!=null)
            app = apiai(client_id);
    }
    textRequest(query: string | [string], options: TextRequestOptions ): TextRequest {
        if(!options)
            options=altOptions;
        return app.textRequest(query,options);
    }
    eventRequest(event: Event, options: EventRequestOptions): EventRequest {
        return app.eventRequest(event,options);
    }
    contextsRequest(contexts: [any], options: ContextsRequestOptions): ContextsRequest {
        return app.contextsRequest(contexts,options);
    }
    deleteContextsRequest(options: DeleteContextsRequestOptions): DeleteContextsRequest {
        return app.deleteContextsRequest(options);
    }
    userEntitiesRequest(user_entities_body: UserEntitiesBody, options?: UserEntitiesRequestOptions): UserEntitiesRequest {
        return app.userEntitiesRequest(user_entities_body,options);
    }

}
  