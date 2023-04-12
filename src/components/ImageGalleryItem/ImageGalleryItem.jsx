import PropTypes from 'prop-types';
import { Component } from 'react';
import { GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    isShowModal: false,
  };

  showModal = () => {
    this.setState({ isShowModal: true });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { isShowModal } = this.state;
    const { srcSmallImg, srcLargeImg, alt } = this.props;
    return (
      <GalleryItem>
        <img src={srcSmallImg} alt={alt} onClick={this.showModal} />
        {isShowModal && (
          <Modal src={srcLargeImg} alt={alt} onClose={this.closeModal} />
        )}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  srcLargeImg: PropTypes.string.isRequired,
  srcSmallImg: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
