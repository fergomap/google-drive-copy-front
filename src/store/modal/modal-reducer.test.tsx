import React from 'react';
import modalReducer from './reducer';
import {RESET_ACTION} from '../model/main.action';
import ModalStateImp from './model/modal.state.imp';
import {HIDE_MODAL_ACTION, SHOW_MODAL_ACTION} from './actions';

describe('reducerModal', () => {
	it('should return a new ModalState when the action is RESET', () => {
		expect(modalReducer(undefined, RESET_ACTION)).toEqual(new ModalStateImp());
	});

	it('should return an ModalState with isLoggedIn to true when the action is LOG_IN', () => {
		const showModalAction = {...SHOW_MODAL_ACTION};
		showModalAction.content = <span/>;
		expect(modalReducer(undefined, showModalAction)).toEqual(new ModalStateImp(true, showModalAction.content));
	});

	it('should return an ModalState with showModal to false when the action is HIDE_MODAL_ACTION', () => {
		expect(modalReducer(new ModalStateImp(true), HIDE_MODAL_ACTION)).toEqual(new ModalStateImp(false));
	});

	it('should return the default ModalState when the action does not match any', () => {
		expect(modalReducer(undefined, { type: '' })).toEqual(new ModalStateImp());
	});
});
