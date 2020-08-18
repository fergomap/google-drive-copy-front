import LanguageOption from './language-option';

export default class LanguageOptionImp implements LanguageOption {
	label: any;
	value: any;
	formatDate: string;
	formatDateTime: string;

	constructor(label: any = '', value: any = '', formatDate: string = '', formatDateTime: string = '') {
		this.label = label;
		this.value = value;
		this.formatDate = formatDate;
		this.formatDateTime = formatDateTime;
	}
}
