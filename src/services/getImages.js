const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33398437-4a7cf00c243fc948d6b5828b7';

export const getImages = (searchText, page = 1) => {
  return fetch(
    `${BASE_URL}?q=${searchText}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};
