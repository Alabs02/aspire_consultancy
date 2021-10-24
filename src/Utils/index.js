import axiosClient, { postRequest, getRequest } from "./axiosClient";
import getToken from "./getToken";
import slugify from './slugify';
import toFormData from "./toFormData";
import catchAxiosErrors from './catchAxiosErrors';

export {
  axiosClient,
  postRequest,
  getRequest,
  catchAxiosErrors,
  getToken,
  slugify,
  toFormData,
}