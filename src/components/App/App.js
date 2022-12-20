import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { fetchImages } from '../../servises/fetch';
import { ThreeDots } from 'react-loader-spinner';
import SearchBar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from 'components/Button/Button';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchName === '') {
      return;
    }

    const getImages = async () => {
      try {
        setLoading(true);

        const searchImages = await fetchImages(searchName, page);

        if (searchImages.length === 0) {
          toast.error(
            `Sorry, the images you requested: ${searchName}not found 😥. `
          );
        }

        setImages(prevImages => {
          return [...prevImages, ...searchImages];
        });
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    getImages();
  }, [searchName, page]);

  const handleFormSubmit = searchName => {
    setImages([]);
    setPage(1);
    setSearchName(searchName);
  };

  const loadMoreSubmit = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      <SearchBar onSubmit={handleFormSubmit} />

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
      {images.length > 0 && <Button onClick={loadMoreSubmit} />}

      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

export default App;
