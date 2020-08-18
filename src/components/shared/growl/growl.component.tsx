import React, {FunctionComponent, ReactElement, useEffect} from 'react';
import './growl.component.scss';
import {useDispatch, useSelector} from 'react-redux';
import MainState from 'store/model/main.state';
import {HIDE_GROWL_MESSAGE_ACTION} from 'store/growl/actions';
import {FormattedMessage} from 'react-intl';
import GrowlMessage from 'model/growl-message';

const GrowlComponent: FunctionComponent = (): ReactElement => {
	const { messages } = useSelector((state: MainState) => state.growl);
	const dispatch = useDispatch();

	useEffect(() => {
		if (messages.length) {
			setTimeout(() => {
				dispatch(HIDE_GROWL_MESSAGE_ACTION);
			}, 3500)
		}
	}, [dispatch, messages]);

	return <div className="growl-component">
		{ messages.map((message: GrowlMessage, index: number) => {
			return <div className={`growl-message ${message.success && 'success'}`} key={index}>
				<p className="bold no-margin">
					<FormattedMessage id={message.success ? 'action_success' : 'error'}/>
				</p>
				<p className="no-margin">
					<FormattedMessage id={message.message} />
				</p>
			</div>;
		}) }
	</div>;
};

export default GrowlComponent;
