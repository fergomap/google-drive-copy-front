import { AxiosRequestConfig } from 'axios';
import { ReactElement } from 'react';
import { SHOW_MODAL_ACTION } from 'store/modal/actions';

export const getAxiosHeader = (token?: string): AxiosRequestConfig => ({
    headers: {
        'access-token': token
    }
});

export const toBase64 = (file: File | string) => new Promise<string>((resolve: Function, reject: Function) => {
	if (typeof file === 'string') {
		resolve('');
	} else {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	}
});

export const openModal = (dispatch: Function, component: ReactElement): void => {
	const showModalAction = {...SHOW_MODAL_ACTION};
	showModalAction.content = component;
	dispatch(showModalAction);
};
