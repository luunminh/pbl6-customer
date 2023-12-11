import { ApiKey } from '@queries/keys';
import { AuthService, stringify } from '@shared';
import apisauce from 'apisauce';
import axios from 'axios';
import appConfig from 'src/appConfig';
import { ProductListParams, TopSellsParams } from './type';

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

  const getProductList = (params: ProductListParams) => {
    const { ...productParams } = params;
    const queryString = stringify(productParams);
    return api.get(`${ApiKey.PRODUCT}?${queryString}`);
  };

  const getProductDetail = (id: string, storeId: string) => {
    const queryString = stringify({ storeId });
    return api.get(`${ApiKey.PRODUCT}/${id}?${queryString}`);
  };

  const getTopSells = (params: TopSellsParams) => {
    const queryString = stringify(params);
    console.log('queryString', queryString);
    return api.get(`${ApiKey.TOP_SELLS}?${queryString}`);
  };

  return {
    getProductList,
    getProductDetail,
    getTopSells,
  };
};

export default {
  create,
};
