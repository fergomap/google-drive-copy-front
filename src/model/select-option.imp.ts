import SelectOption from './select-option';

export default class SelectOptionImp implements SelectOption {
	label: any;
	value: any;

	constructor(label: any = '', value: any = '') {
		this.label = label;
		this.value = value;
	}
}
