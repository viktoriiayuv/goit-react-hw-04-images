import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <span className="button-label"></span>
        </SearchFormBtn>

        <input
          onChange={handleChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarContainer>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
