import devConfig from './api.dev';
import prodConfig from './api.prod';

const generateUrl = (apiConfig) => (`${apiConfig.protocol}://${apiConfig.ip}:${apiConfig.port}${apiConfig.prefix}`);

let BASE_URL = '';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = generateUrl(devConfig);
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = generateUrl(prodConfig);
} else {
  console.log('Current env is nether development nor production.');
}

export { BASE_URL };

const api = {
  dict: '/dicts',
};

export default api;
