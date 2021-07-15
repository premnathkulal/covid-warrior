import axios, { AxiosResponse } from 'axios'

const TOM_TOM_API = 'https://api.tomtom.com/search/2/'
const COVID_19_API = 'https://api.covid19india.org/data.json'

const getUpdates = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_19_API
  return axios.get<AxiosResponse>(BASE_URL)
}

const getAddressDetails = (
  lat: number,
  lan: number
): Promise<AxiosResponse> => {
  const BASE_URL = TOM_TOM_API
  return axios.get<AxiosResponse>(
    `${BASE_URL}reverseGeocode/${lat}%2c${lan}.json?key=${process.env.VUE_APP_TOM_TOM_API_KEY}`
  )
}

export { getUpdates, getAddressDetails }
