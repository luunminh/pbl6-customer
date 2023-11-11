import axios from 'axios';
import apisauce from 'apisauce';
import appConfig from 'src/appConfig';
import { AuthService, stringify } from '@shared';
import { AddCartPayload, DeleteProductCartPayload } from './types';

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

  const getCartList = (storeId: string) => {
    const queryString = stringify({ storeId: storeId });
    return api.get(`/cart?${queryString}`);
  };

  const addProductToCart = (payload: AddCartPayload) => {
    return api.post('/cart', payload);
  };

  const decreaseProductCart = (payload: AddCartPayload) => {
    return api.patch('/cart', payload);
  };

  const deleteProductCart = (payload: DeleteProductCartPayload) => {
    return api.delete(`/cart/product/${payload.productId}`);
  };

  const deleteCart = () => api.delete('/cart');

  return {
    getCartList,
    addProductToCart,
    decreaseProductCart,
    deleteProductCart,
    deleteCart,
  };
};

export default {
  create,
};
