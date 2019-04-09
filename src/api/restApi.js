import config from '../config';

const {
  API_KEY,
} = config;

const defaultParams = {
  api_key: API_KEY,
};

const esc = encodeURIComponent;
const query = params => Object.keys(params)
  .map(k => `${esc(k)}=${esc(params[k])}`)
  .join('&');

export default class RestApi {
  constructor(API_HOST) {
    this.API_HOST = API_HOST;
  }

  get(urlParams, configInit) {
    // eslint-disable-next-line no-undef
    return fetch(`${this.API_HOST}${urlParams.url}?${query({ ...defaultParams, ...urlParams.queryParams })}`, configInit)
      .then(res => res)
      .then(data => data.json())
      .catch((err) => {
        console.log('error', err);
        throw new Error(err);
      });
  }
}
