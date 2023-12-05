import { AuthService, stringify } from '@shared';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { CancelOrderPayload, CreateOrderPayload } from './type';
import { ApiKey } from '@queries/keys';
import { TableParams } from '@components';

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

  const getOrders = (params: TableParams) => {
    const { ...tableParams } = params;
    const queryString = stringify(tableParams);
    return api.get(`/order?${queryString}`, {});
  };

  const createOrder = (payload: CreateOrderPayload) => {
    return api.post(`${ApiKey.ORDER}`, payload);
  };

  const getOrderDetail = (id: string) => {
    return api.get(`/order/${id}`);
  };

  const cancelOrder = (payload: CancelOrderPayload) => {
    return api.post('/order-request/create-modify-request', payload);
  };

  return {
    getOrders,
    getOrderDetail,
    createOrder,
    cancelOrder,
  };
};

export default {
  create,
};
