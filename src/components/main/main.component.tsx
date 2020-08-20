import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import './main.component.scss';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';
import MainState from 'store/model/main.state';
import { SpinnerComponent } from 'react-element-spinner';
import { i18n } from 'i18n/i18n';
import HeaderComponent from 'components/header/header.component';
import { APP_CONSTANTS } from 'config/app.config';
import LogInComponent from 'components/log-in/log-in.component';
import HomeComponent from 'components/home/home.component';
import { SHOW_LOADING_ACTION, HIDE_LOADING_ACTION } from 'store/loading/actions';
import { getUserData } from 'services/auth.service';
import User from 'model/user';
import { LOG_IN_ACTION } from 'store/auth/actions';
import { showGrowlMessage } from 'components/shared/growl/services/growl.service';
import GrowlMessageImp from 'model/growl-message.imp';
import GrowlComponent from 'components/shared/growl/growl.component';
import SignUpComponent from 'components/sign-up/sign-up.component';
import MenuComponent from 'components/menu/menu.component';

const MainComponent: FunctionComponent = (): ReactElement => {
	const { language } = useSelector((state: MainState) => state.language);
	const { loading } = useSelector((state: MainState) => state.loading);
	const { user } = useSelector((state: MainState) => state.auth);
	const dispatch = useDispatch();
	const [ dataLoaded, setDataLoaded ] = useState<boolean>(false);

	useEffect(() => {
		if (localStorage.drive_copy_token) {
			dispatch(SHOW_LOADING_ACTION);
		
		getUserData()
			.then((userInfo: User) => {
				const logInAction = {...LOG_IN_ACTION};
				logInAction.user = userInfo;
				dispatch(logInAction);
			})
			.catch(err => showGrowlMessage(new GrowlMessageImp(err.response.data.error || 'user_info_load_error'), dispatch))
			.finally(() => {
				setDataLoaded(true);
				dispatch(HIDE_LOADING_ACTION);
			});
		} else {
			setDataLoaded(true);
		}
	}, [dispatch]);

    return dataLoaded ? <IntlProvider locale={language.value} messages={Object.assign(i18n)[language.value]} onError={() => {}}>
		<BrowserRouter>
			<SpinnerComponent loading={loading} position="global" />
			<GrowlComponent/>
			<div className="main-component">
				{ user.email && <HeaderComponent/> }
				{ user.email && <div className="menu-container">
					<MenuComponent/>
				</div> }
				<div className={user.email ? 'main-container' : 'full-width'}>
					<Switch>
						<Route path={APP_CONSTANTS.ROUTES.LOG_IN} render={() => (!user.email ? <LogInComponent/> : <Redirect to={APP_CONSTANTS.ROUTES.HOME}/>)}/>
						<Route path={APP_CONSTANTS.ROUTES.SIGN_UP} render={() => (!user.email ? <SignUpComponent/> : <Redirect to={APP_CONSTANTS.ROUTES.HOME}/>)}/>
						<Route path={APP_CONSTANTS.ROUTES.HOME} render={() => (user.email ? <HomeComponent/> : <Redirect to={APP_CONSTANTS.ROUTES.LOG_IN}/>)}/>
						<Redirect to={APP_CONSTANTS.ROUTES.HOME}/>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	</IntlProvider> : <SpinnerComponent loading={true} position="global" />;
}

export default MainComponent;
