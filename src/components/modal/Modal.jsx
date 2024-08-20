import React, { useEffect, useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import './Modal.css';

const Modal = ({ isVisible, onClose, children }) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
    }, [isVisible]);

    const handleHide = () => {
        setShow(false);
        setTimeout(() => {
            onClose();
        }, 300); 
    };

    return (
        <BootstrapModal
            show={show}
            onHide={handleHide}
            dialogClassName={`modal-dialog ${show ? 'modal-show' : 'modal-hide'}`}
            backdrop="true" 
            keyboard={false} 
            centered 
        >
            <div className="modal-content">
                <Button variant="close" className="close-btn" onClick={handleHide} aria-label="Close">
                </Button>
                <BootstrapModal.Body>
                    {children}
                </BootstrapModal.Body>
            </div>
        </BootstrapModal>
    );
};

export default Modal;

