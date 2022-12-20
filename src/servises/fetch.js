import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30687510-2718d4bf03f80212b157b4ce9';

export const fetchImages = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&key=${API_KEY}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
  );

  const dataImage = response.data.hits.map(
    ({ id, tags, webformatURL, largeImageURL }) => ({
      id,
      tags,
      webformatURL,
      largeImageURL,
    })
  );
  return dataImage;
};
