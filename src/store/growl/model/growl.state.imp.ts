import GrowlMessage from 'model/growl-message';
import GrowlState from './growl.state';

export default class GrowlStateImp implements GrowlState {
    messages: GrowlMessage[];

    constructor(messages: GrowlMessage[] = []) {
        this.messages = messages;
    }
}
