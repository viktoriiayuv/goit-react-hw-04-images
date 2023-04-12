import PropTypes from 'prop-types';
import { Component } from 'react';

import { getImages } from 'services/getImages';
import { ImageGalleryContainer } from './ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

class ImageGallery extends Component {
  state = {
    images: [],
    totalPages: 0,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearchText = prevProps.searchText;
    const currSearchText = this.props.searchText;
    const prevPage = prevProps.searchPage;
    const currPage = this.props.searchPage;

    if (prevSearchText !== currSearchText || prevPage !== currPage) {
      this.setState({ isLoading: true });
      getImages(currSearchText, currPage)
        .then(response => {
          if (!response.ok) {
            return Promise.reject('Oops, something went wrong');
          }
          return response.json();
        })
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(
              `Oops, there are no images found for request: ${currSearchText}`
            );
          }
          const totalPages = Math.ceil(data.totalHits / 12);
          this.setState(prev => {
            if (currPage === 1) {
              return {
                images: [...data.hits],
                totalPages,
              };
            }
            return { images: [...prev.images, ...data.hits] };
          });
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  render() {
    const { images, isLoading, totalPages } = this.state;
    const { handlePageChange, searchPage } = this.props;

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
  }
}

ImageGallery.propTypes = {
  handlePageChange: PropTypes.func.isRequired,
  searchPage: PropTypes.number.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default ImageGallery;
