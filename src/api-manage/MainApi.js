import axios from "axios";

// custom code for multiple country start
import { useCountry } from "contexts/CountryContext";
const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    const country = localStorage.getItem("selectedCountry") || "zm";
    return `https://dash.mixmrt.com/${country}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL; // Default fallback
};
// custom code for multiple country end
console.log("base-url--------", getBaseUrl());
export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const MainApi = axios.create({
  baseURL: getBaseUrl(),
  // baseURL: baseUrl,
});
MainApi.interceptors.request.use(function (config) {
  let zoneid = undefined;
  let token = undefined;
  let language = undefined;
  let currentLocation = undefined;
  let software_id = 33571750;
  let hostname = process.env.NEXT_CLIENT_HOST_URL;
  let moduleid = undefined;

  if (typeof window !== "undefined") {
    zoneid = localStorage.getItem("zoneid");
    token = localStorage.getItem("token");
    language = JSON.parse(localStorage.getItem("language-setting"));
    currentLocation = JSON.parse(localStorage.getItem("currentLatLng"));
    moduleid = JSON.parse(localStorage.getItem("module"))?.id;
  }
  if (currentLocation) config.headers.latitude = currentLocation.lat;
  if (currentLocation) config.headers.longitude = currentLocation.lng;
  if (zoneid) config.headers.zoneid = zoneid;
  if (moduleid) config.headers.moduleId = moduleid;
  if (token) config.headers.authorization = `Bearer ${token}`;
  if (language) config.headers["X-localization"] = language;
  if (hostname) config.headers["origin"] = hostname;
  config.headers["X-software-id"] = software_id;
  config.headers["Accept"] = "application/json";
  return config;
});
// MainApi.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response.status === 401) {
//             toast.error(t('Your token has been expired.please sign in again'), {
//                 id: 'error',
//             })
//             localStorage.removeItem('token')
//             store.dispatch(removeToken())
//         }
//         return Promise.reject(error)
//     }
// )

export default MainApi;
