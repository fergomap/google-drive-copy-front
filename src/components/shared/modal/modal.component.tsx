import React, {FunctionComponent, ReactElement, useEffect, useRef} from 'react';
import MainState from 'store/model/main.state';
import './modal.component.scss';
import {useDispatch, useSelector} from 'react-redux';
import {HIDE_MODAL_ACTION} from 'store/modal/actions';
import {useOutsideAlerter} from 'hooks/click-outside.hook';

const ModalComponent: FunctionComponent = (): ReactElement | null => {
	/* istanbul ignore next */
	const { modal } = useSelector((state: MainState) => state);
	const dispatch = useDispatch();
	const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef, () => dispatch(HIDE_MODAL_ACTION));

	useEffect(() => {
		const closeOnEsc = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				dispatch(HIDE_MODAL_ACTION);
			}
		};

		window.addEventListener('keyup', closeOnEsc);
		return () => window.removeEventListener('keyup', closeOnEsc);
	}, [dispatch]);

	return modal.showModal ? <div className="modal-component">
		<div className="modal-content" ref={wrapperRef}>
            <i className="fa fa-times close-icon" onClick={() => dispatch(HIDE_MODAL_ACTION)}/>
			{ modal.content }
		</div>
	</div> : null;
};

export default ModalComponent;
