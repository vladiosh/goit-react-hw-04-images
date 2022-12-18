import {
  Bar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = event => {
    setSearchName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchName.trim() === '') {
      toast.error('Fill in the search field');

      return;
    }
    onSubmit(searchName);

    setSearchName('');
  };

  return (
    <Bar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <span>
            <BiSearchAlt size="25px" />
          </span>
        </SearchFormButton>

        <SearchFormInput
          value={searchName}
          onChange={handleChange}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Bar>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
