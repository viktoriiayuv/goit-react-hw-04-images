import { useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ alt, srcLargeImg, srcSmallImg }) => {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <GalleryItem>
      <img src={srcSmallImg} alt={alt} onClick={showModal} />
      {isShowModal && (
        <Modal src={srcLargeImg} alt={alt} onClose={closeModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  srcLargeImg: PropTypes.string.isRequired,
  srcSmallImg: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
