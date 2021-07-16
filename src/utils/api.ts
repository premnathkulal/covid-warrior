import axios, { AxiosResponse } from 'axios'

const TOM_TOM_API = 'https://api.tomtom.com/search/2/'
const COVID_19_API = 'https://api.covid19india.org/data.json'
const NEWS_API = 'https://api.nytimes.com/svc/'

const getUpdates = (): Promise<AxiosResponse> => {
  const BASE_URL = COVID_19_API
  return axios.get<AxiosResponse>(BASE_URL)
}

const getAddressDetails = (
  lat: number,
  lon: number
): Promise<AxiosResponse> => {
  const BASE_URL = TOM_TOM_API
  return axios.get<AxiosResponse>(
    `${BASE_URL}reverseGeocode/${lat}%2c${lon}.json?key=${process.env.VUE_APP_TOM_TOM_API_KEY}`
  )
}

const topStoriesAPI = (): Promise<AxiosResponse> => {
  const BASE_URL = NEWS_API
  return axios.get(
    `${BASE_URL}topstories/v2/health.json?api-key=${process.env.VUE_APP_NEWS_API_KEY}`
  )
}

export { getUpdates, getAddressDetails, topStoriesAPI }
