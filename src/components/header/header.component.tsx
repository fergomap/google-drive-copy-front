import React, { FunctionComponent, ReactElement } from 'react';
import './header.component.scss';
import MainState from 'store/model/main.state';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import Tooltip from 'rc-tooltip';
import UserInfoComponent from './components/user-info/user-info.component';
import SelectComponent from 'react-select';
import { LANGUAGE_CONSTANTS } from 'config/language.config';
import LanguageOption from 'model/language-option';
import { CHANGE_LANGUAGE_ACTION } from 'store/language/actions';
import {setLocale} from 'services/language.service';

const HeaderComponent: FunctionComponent = (): ReactElement => {
	const { user } = useSelector((state: MainState) => state.auth);
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const changeLanguage = (newLanguage: LanguageOption): void => {
        const changeLanguageAction = {...CHANGE_LANGUAGE_ACTION};
        changeLanguageAction.language = newLanguage;
        dispatch(changeLanguageAction);
        setLocale(newLanguage);
    };

    return <div className="header-component">
        <div className="col-4">
            <img src={process.env.PUBLIC_URL + 'drive.png'} alt="logo"/>
        </div>
        <input className="col-4" placeholder={formatMessage({ id: 'search' })} />
        <div className="language-container col-4">
            <SelectComponent 
                options={LANGUAGE_CONSTANTS.LANGUAGES} 
                onChange={(o: any) => changeLanguage(o)}
                isSearchable={false}
                classNamePrefix="select"
            />
            <Tooltip placement="bottom" trigger={['click']} overlay={<UserInfoComponent/>}>
                <img src={user.avatar} alt="user" />
            </Tooltip>
        </div>
    </div>;
}

export default HeaderComponent;
