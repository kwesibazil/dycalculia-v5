import router from "@/router";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL_DEV,     //👈replace with env variable,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

//interceptors in 'Axios' are equivalent to middleware in Express
//its can be to transform the request before Axios sends it, 
//or transform the response before Axios returns the response to your code

// make sure data property matches/exist in express route
// e.g res.status(err.statusCode).json({'err': err.message})


const errorHandler = err =>{
  let path = {}

  switch(err.response.status){
    case 401:
      path = 'unauthorize-access'
      break  
    case 404: 
      path = 'not-found'
      break
    case 500: 
      path = 'internal-error'
      break;
    case 0:                                 //👈  axios return status'0' in the event of
      path = 'server-maintenance'           //  ERR_CONNECTION_REFUSED
      break;
    default:
      return (Promise.reject(err))
  }

  router.push(path)
  return Promise.reject(err)
}

axiosInstance.interceptors.response.use(response => (response), errorHandler)
export default axiosInstance;
