import PropTypes from 'prop-types';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
} from './Searchbar.styled';

import { Component } from 'react';

class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = e => {
    const { value } = this.state;
    e.preventDefault();
    this.props.onSubmit(value);
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormBtn type="submit">
            <span className="button-label"></span>
          </SearchFormBtn>

          <input
            onChange={this.handleChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
