import api from './api';

const results = document.getElementById('results');
let recommendations = null;
const input = document.getElementsByTagName('input')[0];
const button = document.getElementsByTagName('button')[0];

const getData = async (url, cb) => {
  const data = await api.get(url, null);
  console.log(data);
  cb(data);
};

const renderItem = ({
  title,
  name,
  id,
}, node) => {
  const container = document.createElement('div');

  container.innerHTML = `
    <a href='?movieId=${id}'>${title || name}</a>
  `;

  node.appendChild(container);
};

const renderList = node => ({ results: listFilms }) => listFilms.map(film => renderItem(film, node));

const renderDetails = ({
  title,
  overview,
  poster_path,
  id,
}) => {
  const container = document.createElement('div');

  container.innerHTML = `
    <img src="http://image.tmdb.org/t/p/w185/${poster_path}" alt="">
    <h2>${title}</h2>
    <div>${overview}</div>

    <div>
      <h2>Recommendations</h2>
      <div id="recommendations"></div>
    </div>
  `;

  results.appendChild(container);
  recommendations = document.getElementById('recommendations');
  getData({ url: `/movie/${id}/recommendations`, queryParams: {} }, renderList(recommendations));
};

const clearResults = () => {
  results.innerHTML = '';
};

const handleInputClick = () => {
  if (!window.location.search) return;

  window.location.href = '/';
};

const handleButtonClick = () => {
  if (!input.value) return;

  clearResults();
  getData({ url: '/search/movie', queryParams: { query: input.value } }, renderList(results));
};

input.addEventListener('click', handleInputClick);
button.addEventListener('click', handleButtonClick);

const routing = () => {
  const { search } = window.location;

  if (!search) {
    getData({ url: '/trending/all/day', queryParams: {} }, renderList(results));

    return;
  }

  const [, matchKey, matchValue] = search.match(/\?(.+)=(\d+)/);

  if (matchKey === 'movieId') {
    getData({ url: `/movie/${matchValue}`, queryParams: {} }, renderDetails);
  }
};

routing();
