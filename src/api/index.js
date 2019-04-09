import RestApi from './restApi';
import config from '../config';

const {
  API_HOST,
} = config;

export default new RestApi(API_HOST);
