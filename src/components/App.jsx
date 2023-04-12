import { useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [searchText, setSearchText] = useState('');
  const [searchPage, setSearchPage] = useState(1);

  const handleSearch = searchText => {
    if (searchText.trim() === '') {
      alert('Enter a search query');
      return;
    }
    setSearchText(searchText.trim());
    setSearchPage(1);
  };

  const handlePageChange = () => {
    setSearchPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery
        searchText={searchText}
        searchPage={searchPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default App;
