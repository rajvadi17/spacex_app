import {  APP_URL } from "../constants/apiBaseUrl";
import { AjaxService } from "../utils/AjaxService";


export const getPizzaList = (_queryParam) => {
  return AjaxService.get(
    APP_URL + _queryParam
  ).then(
    (res) => res.data,
    (error) => {
      throw error.response.data;
    }
  );
};

