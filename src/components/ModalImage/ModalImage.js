import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { modalStyles } from './ModalImage.styled';

Modal.setAppElement('#root');

const ModalImage = ({ url, tags, modalIsOpen, closeModal }) => {
  return (
    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyles}>
      <img src={url} alt={tags} />
    </Modal>
  );
};

export default ModalImage;

ModalImage.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string,
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
