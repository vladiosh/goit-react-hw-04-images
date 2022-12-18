import React from 'react';
import { Component } from 'react';
import { Container } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from '../../servises/fetch';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    page: 1,
    loading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName || prevState.page !== page) {
      try {
        this.setState({ loading: true });

        const searchImages = await fetchImages(searchName, page);

        if (searchImages.length === 0) {
          toast.error(
            `Sorry, the images you requested: ${searchName}not found 😥. `
          );
        }

        this.setState(({ images }) => {
          return {
            images: [...images, ...searchImages],
          };
        });
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleFormSubmit = searchName => {
    this.setState({
      searchName,
      images: [],
      page: 1,
    });
  };

  loadMoreSubmit = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading } = this.state;

    return (
      <Container>
        <SearchBar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && <ImageGallery images={images} />}

        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ justifyContent: 'center' }}
            wrapperClassName=""
            visible={true}
          />
        )}
        {images.length > 0 && <Button onClick={this.loadMoreSubmit} />}

        <Toaster position="top-right" reverseOrder={false} />
      </Container>
    );
  }
}

export default App;
