import { AuthService } from '@shared';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { CreateOrderPayload } from './type';
import { ApiKey } from '@queries/keys';

axios.defaults.withCredentials = true;
const create = (baseURL = `${appConfig.API_URL}`) => {
  //
  // Create and configure an apisauce-based api object.
  //
  const token = AuthService.getTokenFromStorage();
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: 0,
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    timeout: appConfig.CONNECTION_TIMEOUT,
  });

  const createOrder = (payload: CreateOrderPayload) => {
    return api.post(`${ApiKey.ORDER}`, payload);
  };

  return {
    createOrder,
  };
};

export default {
  create,
};
