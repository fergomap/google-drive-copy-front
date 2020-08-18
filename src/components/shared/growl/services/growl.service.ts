import GrowlMessage from 'model/growl-message';
import {SHOW_GROWL_MESSAGE_ACTION} from 'store/growl/actions';

export const showGrowlMessage = (message: GrowlMessage, dispatch: Function): void => {
	const showGrowlMessageAction = {...SHOW_GROWL_MESSAGE_ACTION};
	showGrowlMessageAction.message = message;
	dispatch(showGrowlMessageAction);
};
