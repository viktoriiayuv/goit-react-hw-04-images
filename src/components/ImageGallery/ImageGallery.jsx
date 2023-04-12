import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { getImages } from 'services/getImages';
import { ImageGalleryContainer } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

const ImageGallery = ({ handlePageChange, searchPage, searchText }) => {
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchText === '') {
      return;
    }
    if (searchPage === 1) {
      setImages([]);
    }
    setIsLoading(true);
    getImages(searchText, searchPage)
      .then(response => {
        if (!response.ok) {
          return Promise.reject('Oops, something went wrong');
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          return Promise.reject(
            `Oops, there are no images found for request: ${searchText}`
          );
        }
        const totalPages = Math.ceil(data.totalHits / 12);
        setImages(prev => [...prev, ...data.hits]);
        setTotalPages(totalPages);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchText, searchPage]);

  return (
    <>
      {images.length > 0 && (
        <ImageGalleryContainer>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              srcSmallImg={webformatURL}
              srcLargeImg={largeImageURL}
              alt={tags}
            />
          ))}
        </ImageGalleryContainer>
      )}
      {isLoading && <Loader />}
      {!isLoading && images.length > 0 && searchPage < totalPages && (
        <Button onClick={handlePageChange} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  searchPage: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default ImageGallery;
