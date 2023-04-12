import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchText: '',
    searchPage: 1,
  };

  handleSearch = searchText => {
    this.setState({ searchText: searchText.trim(), searchPage: 1 });
  };

  handlePageChange = () => {
    this.setState(prevState => ({ searchPage: prevState.searchPage + 1 }));
  };

  render() {
    const { searchText, searchPage } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          searchText={searchText}
          searchPage={searchPage}
          handlePageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default App;
