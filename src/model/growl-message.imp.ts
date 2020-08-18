import GrowlMessage from './growl-message';

export default class GrowlMessageImp implements GrowlMessage {
    message: string;
    success: boolean;

    constructor(message: string = '', success: boolean = false) {
        this.message = message;
        this.success = success;
    }
}
