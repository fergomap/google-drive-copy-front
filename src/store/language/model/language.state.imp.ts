import LanguageState from './language.state';
import {getStartLanguage} from 'services/language.service';
import LanguageOption from 'model/language-option';

export default class LanguageStateImp implements LanguageState {
	language: LanguageOption;

	constructor(language: LanguageOption = getStartLanguage()) {
		this.language = language;
	}
}
