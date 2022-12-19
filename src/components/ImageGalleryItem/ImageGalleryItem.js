import { useState } from 'react';
import PropTypes from 'prop-types';
import ModalImage from '../ModalImage/ModalImage';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {showModal && (
        <ModalImage
          url={largeImageURL}
          tags={tags}
          modalIsOpen={showModal}
          closeModal={toggleModal}
        />
      )}
    </GalleryItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
