import AuthState from 'store/auth/model/auth.state';
import GrowlState from 'store/growl/model/growl.state';
import LanguageState from 'store/language/model/language.state';
import LoadingState from '../loading/model/loading.state';

export default interface MainState {
	auth: AuthState;
	growl: GrowlState;
	language: LanguageState;
	loading: LoadingState;
}
