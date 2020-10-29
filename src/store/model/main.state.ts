import AuthState from 'store/auth/model/auth.state';
import FolderState from 'store/folder/model/folder.state';
import GrowlState from 'store/growl/model/growl.state';
import LanguageState from 'store/language/model/language.state';
import LoadingState from '../loading/model/loading.state';
import ModalState from 'store/modal/model/modal.state';

export default interface MainState {
	auth: AuthState;
	folder: FolderState;
	growl: GrowlState;
	language: LanguageState;
	loading: LoadingState;
	modal: ModalState;
}
