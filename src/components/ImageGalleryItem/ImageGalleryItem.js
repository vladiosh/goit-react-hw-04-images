import React from 'react';
import PropTypes from 'prop-types';
import ModalImage from '../ModalImage/ModalImage';
import { Component } from 'react';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModal } = this.state;
    return (
      <GalleryItem>
        <Image src={webformatURL} alt={tags} onClick={this.toggleModal} />
        {showModal && (
          <ModalImage
            url={largeImageURL}
            tags={tags}
            modalIsOpen={showModal}
            closeModal={this.toggleModal}
          />
        )}
      </GalleryItem>
    );
  }
}

export default ImageGalleryItem;
