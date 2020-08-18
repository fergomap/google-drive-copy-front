import LanguageOption from '../model/language-option';
import LanguageOptionImp from '../model/language-option.imp';

interface LanguageConfig {
	LANGUAGES: LanguageOption[]
}

export const LANGUAGE_CONSTANTS: LanguageConfig = {
	LANGUAGES: [
		new LanguageOptionImp('Español', 'es', 'DD/MM/YYYY', 'DD/MM/YYYY HH:mm'),
		new LanguageOptionImp('English', 'en', 'MM/DD/YYYY', 'MM/DD/YYYY HH:mm')
	]
};
