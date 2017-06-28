

import * as apiai from 'apiai';
import * as fs from 'fs';
import { BaseAssistant } from './BaseAssistant'


export class Assistant extends BaseAssistant
{
    constructor(client_id?:string){
        super(client_id);
    }

}