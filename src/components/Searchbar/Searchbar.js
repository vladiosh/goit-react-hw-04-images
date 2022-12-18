import {
  Bar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { BiSearchAlt } from 'react-icons/bi';
import { Component } from 'react';
import React from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  state = {
    searchName: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = event => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchName.trim() === '') {
      toast.error('Fill in the search field');

      return;
    }
    this.props.onSubmit(this.state.searchName);

    this.setState({ searchName: '' });
  };

  render() {
    return (
      <Bar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <span>
              <BiSearchAlt size="25px" />
            </span>
          </SearchFormButton>

          <SearchFormInput
            value={this.state.searchName}
            onChange={this.handleChange}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Bar>
    );
  }
}

export default SearchBar;
