import axios from 'axios'
import Cookies from 'js-cookie'

const axiosApi = axios.create({})

axiosApi.interceptors.request.use(config => {
  const token = Cookies.get('jwtToken')
  if (token) {
    config.headers = {
      Authorization: token,
    }
  }
  return config
})
export default axiosApi
