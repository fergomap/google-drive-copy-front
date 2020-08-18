import {LANGUAGE_CONSTANTS} from 'config/language.config';
import moment from 'moment';
import LanguageOption from 'model/language-option';

export const getStartLanguage = (): LanguageOption => {
    const userLanguage = localStorage.drive_copy_current_language || navigator.language;
    const currentLanguage = LANGUAGE_CONSTANTS.LANGUAGES.find((languageOption: LanguageOption) => userLanguage.toLowerCase().includes(languageOption.value)) || LANGUAGE_CONSTANTS.LANGUAGES[0];
    setLocale(currentLanguage);
    return currentLanguage;
};

export const setLocale = (language: LanguageOption): void => {
    language = language.value ? language : LANGUAGE_CONSTANTS.LANGUAGES[0];
    localStorage.drive_copy_current_language = language.value;
    moment.locale(language.value);
};

export const getLocale = (languageCode: string): LanguageOption => {
    return LANGUAGE_CONSTANTS.LANGUAGES.find((language: LanguageOption) => language.value === languageCode) || LANGUAGE_CONSTANTS.LANGUAGES[0];
};
